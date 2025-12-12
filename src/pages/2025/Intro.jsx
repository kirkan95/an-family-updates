import React from "react";
import styled from "styled-components";

const IntroWrapper = styled.div`
  background-color: #6b212c;
  color: white;
  padding: 1rem 0 4rem;

  .vertical {
    max-width: 660px;
  }

  img {
    width: 100%;
    max-width: 1440px;
    display: block; // BEGIN: Centering
    margin: 0 auto; // END: Centering
  }

  h2 {
    text-wrap: balance;
    font-size: 2.2rem;
    padding: 0 0.5rem;
    max-width: 660px;
    margin: 0 auto 4rem;
  }

  .person {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 2rem;
    padding: 0 0.5rem;
    max-width: 660px;
    margin: 2rem auto 0;
  }

  .person-text {
    padding: 0 0.5rem;
    font-size: 0.9rem;
    max-width: 660px;
    margin: auto;
  }
`;

const SvgWave = styled.svg`
  display: block;
  width: 100%;
  margin-bottom: -1px;
  padding: 0;
`;

const Intro = ({ content, selectedPeople }) => {
  return (
    <>
      <SvgWave viewBox="0 0 1440 320">
        <path
          fill="#6B212C"
          fillOpacity="1"
          d="M0,256L60,224C120,192,240,128,360,96C480,64,600,64,720,90.7C840,117,960,171,1080,197.3C1200,224,1320,224,1380,224L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </SvgWave>
      <IntroWrapper>
        <h2 className="notable-regular">{selectedPeople + "'s 2025"}</h2>
        {content.map((obj, index) => {
          return (
            <div key={index}>
              {obj.type === "text" && (
                <>
                  <p className="rozha-one-regular person" key={obj.person}>
                    {obj.person}
                  </p>
                  <p className="dm-sans person-text" key={obj.text}>
                    {obj.text}
                  </p>
                </>
              )}
              {obj.type === "photo" && (
                <img
                  key={obj.src}
                  src={obj.src}
                  alt={obj.person}
                  className={obj.vertical ? "vertical" : ""}
                />
              )}
            </div>
          );
        })}
      </IntroWrapper>
    </>
  );
};

export default Intro;
