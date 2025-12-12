import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ScrollyCard from "./ScrollyCard";
import Map from "./Map";
import { InView } from "react-intersection-observer";

const ScrollyWrapper = styled.div`
  width: 100%;
  position: relative;
  background-color: #8ea1ae;
  z-index: -50;
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

const TitleCard = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StickyEl = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgb(245, 245, 245);
  position: sticky;
  top: 0;
  left: 0;
  z-index: -5;
`;

const SvgWave = styled.svg`
  display: block;
  width: 100%;
  margin-bottom: -2px;
  padding-bottom: -1px;
  background-color: #6b212c;
`;

const Scrolly = ({ sectionData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <SvgWave viewBox="0 0 1440 320">
        <path
          fill="#8EA1AE"
          fillOpacity="1"
          d="M0,96L60,112C120,128,240,160,360,144C480,128,600,64,720,37.3C840,11,960,21,1080,48C1200,75,1320,117,1380,138.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </SvgWave>
      <ScrollyWrapper>
        <TitleCard>
          <InView>
            {({ inView, ref }) => (
              <h2
                ref={ref}
                className={`notable-regular ${inView ? "in-view" : ""}`}
                style={{ padding: "1rem" }}
              >
                2025 travel highlights
              </h2>
            )}
          </InView>
        </TitleCard>
        <StickyEl>
          <Map latLong={sectionData[activeIndex].latLong} />
        </StickyEl>
        {sectionData.map((el, index) => (
          <ScrollyCard
            cardNumber={index}
            setActiveIndex={setActiveIndex}
            data={el}
            key={`scrolly-${el.location}`}
          />
        ))}
      </ScrollyWrapper>
    </>
  );
};

export default Scrolly;
