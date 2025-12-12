import React from "react";
import styled from "styled-components";
import { InView } from "react-intersection-observer";

const MusicWrapper = styled.div`
  background-color: #685652;
  padding-bottom: 25vh;

  h2 {
    margin: 0 auto;
    color: white;
    transition: transform 0.5s ease, opacity 0.5s ease;
    transform: translateX(-100%);
    opacity: 0;
    font-size: 2.2rem;
  }

  h2.in-view {
    transform: translateX(0);
    opacity: 1;
  }
`;

const SvgWave = styled.svg`
  display: block;
  line-height: 0;
  width: 100%;
  margin-bottom: -3px;
  background-color: #dce0e8;
`;

const TitleCard = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-wrap: balance;
`;

const EmbedWrapper = styled.div`
  max-width: 660px;
  margin: auto;
  color: white;

  h3 {
    margin: 0 auto;
    font-size: 2rem;
    line-height: 1;
    text-wrap: balance;
  }

  .description {
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .no-description-spacing {
    margin-bottom: 1rem;
  }
`;

const getSpotifyEmbedUrl = (url) => {
  return url
    .replace("open.spotify.com/track", "open.spotify.com/embed/track")
    .split("?")[0];
};

const SongEmbed = ({ song, isLast }) => {
  const embedUrl = getSpotifyEmbedUrl(song.url);

  return (
    <EmbedWrapper style={{ marginBottom: "2rem", padding: "0 1rem" }}>
      <h3 className="rozha-one-regular">{song.song_title}</h3>
      <p
        className={`dm-sans ${
          song.description ? "" : "no-description-spacing"
        }`}
      >
        <em>{song.artist}</em>
      </p>
      {song.description && (
        <p className="dm-sans description">{song.description}</p>
      )}
      <iframe
        src={embedUrl}
        width="100%"
        height="152"
        style={{ border: "none", marginBottom: "2rem" }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      {!isLast && (
        <div
          style={{
            width: "5rem",
            borderBottom: "1px solid white",
            margin: "auto",
          }}
        />
      )}{" "}
    </EmbedWrapper>
  );
};

const Music = ({ sectionData }) => {
  return (
    <>
      <SvgWave viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="#685652"
          fillOpacity="1"
          d="M0,160L30,181.3C60,203,120,245,180,229.3C240,213,300,139,360,112C420,85,480,107,540,133.3C600,160,660,192,720,208C780,224,840,224,900,224C960,224,1020,224,1080,192C1140,160,1200,96,1260,101.3C1320,107,1380,181,1410,218.7L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </SvgWave>
      <MusicWrapper>
        <TitleCard>
          <InView>
            {({ inView, ref }) => (
              <h2
                ref={ref}
                className={`notable-regular ${inView ? "in-view" : ""}`}
                style={{ padding: "1rem" }}
              >
                2025 in music
              </h2>
            )}
          </InView>
        </TitleCard>
        {sectionData.map((song, idx) => (
          <SongEmbed
            key={idx}
            song={song}
            isLast={idx === sectionData.length - 1}
          />
        ))}
      </MusicWrapper>
    </>
  );
};

export default Music;
