#!/usr/bin/env node

import express from "express";
import archieml from "archieml";
import url from "url";
import { google } from "googleapis";
import pkg from "html-entities";
import * as htmlparser2 from "htmlparser2";
const { AllHtmlEntities: Entities } = pkg;

const CLIENT_ID =
  "384954292384-ddbggmqasr8ca2t6sk71krgg31njaq1q.apps.googleusercontent.com";
const CLIENT_SECRET = "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";

const app = express();
const drive = google.drive("v2");

// Set up auth
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  "http://127.0.0.1:3000/oauth2callback"
);

google.options({ auth: oauth2Client });
let KEY = "1JjYD90DyoaBuRYNxa4_nqrHKkgZf1HrUj30i3rTWX1s";

app.get("/oauth2callback", async (req, res) => {
  res.type("json");
  const code = url.parse(req.url, true).query.code;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    drive.files.get({ fileId: KEY }, (err, doc) => {
      if (err) return res.send(err);

      const export_link = doc.exportLinks["text/html"];
      oauth2Client._makeRequest(
        { method: "GET", uri: export_link },
        (err, body) => {
          const handler = new htmlparser2.DomHandler((error, dom) => {
            const tagHandlers = {
              _base: (tag) => {
                let str = "";
                tag.children.forEach((child) => {
                  if ((func = tagHandlers[child.name || child.type]))
                    str += func(child);
                });
                return str;
              },
              text: (textTag) => textTag.data,
              span: (spanTag) => tagHandlers._base(spanTag),
              p: (pTag) => tagHandlers._base(pTag) + "\n",
              a: (aTag) => {
                let href = aTag.attribs.href;
                if (!href) return "";

                if (url.parse(aTag.attribs.href, true).query?.q) {
                  href = url.parse(aTag.attribs.href, true).query.q;
                }

                return `<a href="${href}">${tagHandlers._base(aTag)}</a>`;
              },
              li: (tag) => `* ${tagHandlers._base(tag)}\n`,
            };

            ["ul", "ol"].forEach((tag) => {
              tagHandlers[tag] = tagHandlers.span;
            });
            ["h1", "h2", "h3", "h4", "h5", "h6"].forEach((tag) => {
              tagHandlers[tag] = tagHandlers.p;
            });

            const body = dom[0].children[1];
            let parsedText = tagHandlers._base(body);

            const entities = new Entities();
            parsedText = entities.decode(parsedText);

            parsedText = parsedText.replace(/<[^<>]*>/g, (match) =>
              match.replace(/”|“/g, '"').replace(/‘|’/g, "'")
            );

            const parsed = archieml.load(parsedText);
            res.send(parsed);
          });

          const parser = new htmlparser2.Parser();
          parser.write(body);
          parser.end();
        }
      );
    });
    console.log(res);
  } catch (err) {
    res.send(err);
  }
});

app.get("/:key", (req, res) => {
  const redirect_url = oauth2Client.generateAuthUrl({
    scope: "https://www.googleapis.com/auth/drive",
  });
  res.redirect(redirect_url);
});

app.param("key", (req, res, next, key) => {
  KEY = key || KEY;
  next();
});

const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Example app listening at http://${address}:${port}`);
});
