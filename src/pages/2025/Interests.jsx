import React from "react";
import styled from "styled-components";
import { InView } from "react-intersection-observer";

const InterestWrapper = styled.div`
  background-color: #27363f;
  color: #dce0e8;
  padding-bottom: 25vh;

  h2 {
    margin: 0 auto;
    color: #dce0e8;
    transition: transform 0.5s ease, opacity 0.5s ease;
    transform: translateX(-100%);
    opacity: 0;
    font-size: 2.2rem;
  }

  h2.in-view {
    transform: translateX(0);
    opacity: 1;
  }

  .interest,
  .description {
    padding: 0 0.5rem;
  }

  .interest {
    margin: 0 auto;
    max-width: 660px;
    font-size: 2rem;
    line-height: 2rem;
  }

  .description {
    font-size: 0.9rem;
    max-width: 660px;
    margin: 0 auto 1rem;
  }
`;

const SvgWave = styled.svg`
  display: block;
  width: 100%;
  margin-bottom: -1px;
  padding: 0;
  background-color: #695652;
`;

const TitleCard = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-wrap: balance;
`;

const Interests = ({ sectionData }) => {
  return (
    <>
      <SvgWave viewBox="0 0 1440 320">
        <path
          fill="#27363F"
          fillOpacity="1"
          d="M0,192L30,186.7C60,181,120,171,180,192C240,213,300,267,360,266.7C420,267,480,213,540,186.7C600,160,660,160,720,181.3C780,203,840,245,900,250.7C960,256,1020,224,1080,202.7C1140,181,1200,171,1260,181.3C1320,192,1380,224,1410,240L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </SvgWave>
      <InterestWrapper>
        <TitleCard>
          <InView>
            {({ inView, ref }) => (
              <h2
                ref={ref}
                className={`notable-regular ${inView ? "in-view" : ""}`}
                style={{ padding: "1rem" }}
              >
                Brand new interests
              </h2>
            )}
          </InView>
        </TitleCard>
        {sectionData.map((interest) => {
          return (
            <div key={interest.title} style={{ marginBottom: "2rem" }}>
              <h3 className="rozha-one-regular interest">
                {interest.interest}
              </h3>
              <p className="dm-sans description">{interest.description}</p>
            </div>
          );
        })}
      </InterestWrapper>
    </>
  );
};

export default Interests;
