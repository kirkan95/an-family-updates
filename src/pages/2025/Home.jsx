import React from "react";
import styled from "styled-components";

const HomeWrapper = styled.div`
  min-height: 100vh;
  max-width: 1100px;
  margin: 0 auto;
`;

const StyledTitleCard = styled.div`
  text-wrap: balance;
  margin-bottom: 1rem;
  p {
    font-size: 0.9rem;
    font-style: italics;
  }
`;

const HomeImage = styled.img`
  width: 100%;
  max-width: 1100px;
`;

const Home = ({ sectionData }) => {
  console.log(sectionData);
  return (
    <HomeWrapper>
      {sectionData.map((content) => {
        if (content.type === "text") {
          return (
            <StyledTitleCard key={content.text} className="title-card">
              <h1 className="notable-regular">{content.text}</h1>
              <p className="dm-sans">
                Please open the menu above to see our family's updates!
              </p>
            </StyledTitleCard>
          );
        }
        if (content.type === "image") {
          return <HomeImage key={content.src} src={content.src} />;
        }
      })}
    </HomeWrapper>
  );
};

export default Home;
