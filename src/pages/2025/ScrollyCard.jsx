import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { InView } from "react-intersection-observer";
import { imageMap2025 } from "../../utils/imageMap2025";

const Card = styled.div`
  width: 100%;
  min-height: 150vh;
  margin-bottom: 3rem;
`;

const CardContent = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background-color: #8ea1ae;
  color: white;
  width: calc(100% - 40px);
  max-width: 660px;
  padding: 0.5rem;
  p:last-of-type {
    margin-bottom: 0;
  }

  .scrollyImage {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
  }

  .location {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .description {
    font-size: 0.85rem;
  }
`;

const ScrollyCard = ({ cardNumber, setActiveIndex, data }) => {
  // function that handles what happens when a card is in view
  // out of the box it checks a data attribute on the card that holds
  // the card number, and updates the state with that value
  const handleInView = (inView, entry) => {
    if (inView) {
      setActiveIndex(entry.target.getAttribute("data-scrollyValue"));
    }
  };

  return (
    <Card>
      <InView
        as="div"
        onChange={(inView, entry) => handleInView(inView, entry)}
        threshold={0.3}
        data-scrollyValue={cardNumber}
      >
        <CardContent>
          {data.img && (
            <img
              className="scrollyImage"
              src={imageMap2025[data.img]}
              alt={data.location}
            />
          )}
          <p className="rozha-one-regular location">{data.location}</p>
          <p className="dm-sans description">{data.description}</p>
        </CardContent>
      </InView>
    </Card>
  );
};

export default ScrollyCard;
