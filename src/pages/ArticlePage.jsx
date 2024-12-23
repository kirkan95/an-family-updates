import React, { useEffect, useState } from "react";
import { imgArr } from "../utils/imageParsing";
import "../../src/App.css";

const ArticlePage = ({ article }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  const maxScroll = 500;

  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile) {
        setScrollY(Math.min(window.scrollY, maxScroll));
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const scaleValue = isMobile ? 1 : 1.2 - (scrollY / maxScroll) * 0.2;
  const parallaxStyle = isMobile
    ? {}
    : {
        transform: `scale(${scaleValue})`,
        transition: "transform 0.1s",
      };

  let content = [];

  article["data"].forEach((element, index) => {
    let htmlEl;
    if (element.section_type === "headline") {
      htmlEl = (
        <h2
          key={element.section_type + index}
          className="rock-salt-regular headline"
        >
          {element.text}
        </h2>
      );
    }
    if (element.section_type === "paragraph") {
      htmlEl = (
        <p
          dangerouslySetInnerHTML={{ __html: element.text }}
          key={element.section_type + index}
          className="crimson-text-regular paragraph"
        ></p>
      );
    }
    if (element.section_type === "subhed") {
      htmlEl = (
        <h3 className="lexend-deca" key={element.section_type + index}>
          {element.text}
        </h3>
      );
    }
    if (element.section_type === "hero-image") {
      htmlEl = (
        <div
          className="hero-image-container"
          key={element.section_type + index}
        >
          <img
            className="hero-image"
            src={imgArr[element.img_name]}
            alt={element.img_name}
            style={parallaxStyle}
          />
        </div>
      );
    }
    if (element.section_type === "image-list-first") {
      htmlEl = (
        <div className="image-list first">
          <img
            className="inline-image"
            key={element.section_type + index}
            src={imgArr[element.img_name]}
            alt={element.img_name}
          />
          <p className="crimson-text-regular paragraph">{element.text}</p>
        </div>
      );
    }
    if (element.section_type === "image-list") {
      htmlEl = (
        <div className="image-list">
          <img
            className="inline-image"
            key={element.section_type + index}
            src={imgArr[element.img_name]}
            alt={element.img_name}
          />
          <p
            className="crimson-text-regular paragraph"
            dangerouslySetInnerHTML={{ __html: element.text }}
          ></p>
        </div>
      );
    }
    if (element.section_type === "image-list-last") {
      htmlEl = (
        <div className="image-list last">
          <img
            className="inline-image"
            key={element.section_type + index}
            src={imgArr[element.img_name]}
            alt={element.img_name}
          />
          <p className="crimson-text-regular paragraph">{element.text}</p>
        </div>
      );
    }
    if (element.section_type === "bullet-list") {
      const listItems = element.text
        .split("*")
        .filter((item) => item.trim() !== "");
      htmlEl = (
        <ul
          key={element.section_type + index}
          className="crimson-text-regular paragraph"
        >
          {listItems.map((item, index) => (
            <li key={index}>{item.trim()}</li>
          ))}
        </ul>
      );
    }
    content.push(htmlEl);
  });

  return <div className="article">{content}</div>;
};

export default ArticlePage;
