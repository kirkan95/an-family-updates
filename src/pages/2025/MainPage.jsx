import React, { useState } from "react";
import Scrolly from "./Scrolly";
import Filter from "./Filter";
import kirkJessica from "../../content/2025/kirk-jessica.json";
import perryElise from "../../content/2025/perry-elise.json";
import arnoldLauraArie from "../../content/2025/arnold-laura-arie.json";
import monica from "../../content/2025/monica.json";
import home from "../../content/2025/home.json";
import Intro from "./Intro";
import Food from "./Food";
import Music from "./Music";
import Interests from "./Interests";
import Milestones from "./Milestones";
import Home from "./Home";
import styled from "styled-components";

const MainWrapper = styled.div`
  margin: auto;
`;

const BackToTopButton = styled.button`
  margin: 20px auto; // BEGIN: Changed to margin for placement
  padding: 10px 15px;
  background-color: #08345e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block; // Added to center the button
  &:hover {
    background-color: #0056b3;
  }
`;

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const dataMap = {
  "Kirk and Jessica": kirkJessica,
  "Perry & Elise": perryElise,
  "Arnold, Laura & Arie": arnoldLauraArie,
  Monica: monica,
  Home: home,
};

const MainPage = () => {
  const [selectedPeople, setSelectedPeople] = useState("Home");

  return (
    <MainWrapper>
      <Filter
        selectedPeople={selectedPeople}
        setSelectedPeople={setSelectedPeople}
      />
      {selectedPeople &&
        dataMap[selectedPeople].map((section, index) => {
          if (section.section === "intro") {
            return (
              <Intro
                key={index}
                content={section.content}
                selectedPeople={selectedPeople}
              />
            );
          }
          if (section.section === "home") {
            return <Home key={index} sectionData={section.content} />;
          }
          if (section.section === "travel") {
            return <Scrolly key={index} sectionData={section.content} />;
          }
          if (section.section === "best-bites") {
            return <Food key={index} sectionData={section.content} />;
          }
          if (section.section === "music") {
            return <Music key={index} sectionData={section.content} />;
          }
          if (section.section === "interests") {
            return <Interests key={index} sectionData={section.content} />;
          }
          if (section.section === "milestones") {
            return <Milestones key={index} sectionData={section.content} />;
          }
        })}
      <BackToTopButton onClick={scrollToTop}>Back to Top</BackToTopButton>
    </MainWrapper>
  );
};

export default MainPage;
