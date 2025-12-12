import React from "react";
import styled, { css } from "styled-components";
import { InView } from "react-intersection-observer";
import { imageMap2025 } from "../../utils/imageMap2025";

const FoodWrapper = styled.div`
  padding: 20px;
  background-color: #dce0e8;
  color: black;

  h3 {
    margin: 0 auto;
  }

  p {
    margin: 0 auto 1rem;
  }

  h2 {
    margin: 0 auto;
    color: black;
    transition: transform 0.5s ease, opacity 0.5s ease;
    transform: translateX(-100%);
    opacity: 0;
    max-width: 660px;
    font-size: 2.2rem;
  }

  h2.in-view {
    transform: translateX(0);
    opacity: 1;
  }
`;

const FoodList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 1440px;
  margin: auto;
`;

const FoodCardWrapper = styled(InView)`
  width: 100%;
`;

const FoodCard = styled.div`
  background-color: #dce0e8;
  padding: 1rem;
  border-radius: 10px;
  max-width: 660px;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 660px) {
    flex-direction: column;
    transform: none; /* Removed transform for fading in place */
    opacity: 1; /* Ensure opacity is set to 1 for fading in */
    align-items: center;
    background-color: #dce0e8;
    max-width: none;
    padding: 0;
    gap: 0.15rem;
    box-shadow: none;
  }

  /* Start further offscreen */
  opacity: 0;
  transform: translateX(${({ index }) => (index % 2 === 0 ? "75px" : "-75px")});
  transition: transform 0.6s ease, opacity 0.6s ease;

  ${({ inView, index }) =>
    inView &&
    css`
      opacity: 1;
      /* Animate to a slight offset instead of 0 */
      transform: translateX(${index % 2 === 0 ? "15px" : "-15px"});
    `}

  .food-img {
    max-width: 250px;
    @media (max-width: 660px) {
      width: 100%;
      max-width: none;
    }
  }

  .text-section {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .dish-name {
      font-size: 1.3rem;
      line-height: 1;
      max-width: 660px;
      margin: 0.5rem 0;
    }

    .description {
      font-size: 0.9rem;
      max-width: 660px;
      margin: 0;
    }
  }
`;

const SvgWave = styled.svg`
  display: block;
  width: 100%;
  margin-bottom: -1px;
  padding: 0;
  background-color: #8ea1ae;
`;

const TitleCard = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-wrap: balance;
`;

const Food = ({ sectionData }) => {
  return (
    <>
      <SvgWave viewBox="0 0 1440 320">
        <path
          fill="#dce0e8"
          fillOpacity="1"
          d="M0,128L30,138.7C60,149,120,171,180,176C240,181,300,171,360,144C420,117,480,75,540,53.3C600,32,660,32,720,53.3C780,75,840,117,900,117.3C960,117,1020,75,1080,90.7C1140,107,1200,181,1260,218.7C1320,256,1380,256,1410,256L1440,256L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </SvgWave>
      <FoodWrapper>
        <TitleCard>
          <InView>
            {({ inView, ref }) => (
              <h2
                ref={ref}
                className={`notable-regular ${inView ? "in-view" : ""}`}
                style={{ padding: "1rem" }}
              >
                Best bites of 2025
              </h2>
            )}
          </InView>
        </TitleCard>

        <FoodList>
          {sectionData.map((item, idx) => (
            <FoodCardWrapper key={item.dish_name} threshold={0.5} triggerOnce>
              {({ inView, ref }) => (
                <FoodCard ref={ref} index={idx} inView={inView}>
                  {item.img && (
                    <img
                      className="food-img"
                      src={imageMap2025[item.img]}
                      alt={item.name}
                    />
                  )}
                  <div className="text-section">
                    <h3 className="rozha-one-regular dish-name">
                      {item.location_name}: {item.dish_name}
                    </h3>
                    {item.description && (
                      <p className="dm-sans description">{item.description}</p>
                    )}
                  </div>
                </FoodCard>
              )}
            </FoodCardWrapper>
          ))}
        </FoodList>
      </FoodWrapper>
    </>
  );
};

export default Food;
