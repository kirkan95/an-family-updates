import React, { useState } from "react";
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

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Home = ({ sectionData }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

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
          return (
            <div key={content.src}>
              {loading && <Spinner />}
              <HomeImage
                src={content.src}
                onLoad={handleImageLoad}
                style={{ display: loading ? "none" : "block" }}
              />
            </div>
          );
        }
      })}
    </HomeWrapper>
  );
};

export default Home;
