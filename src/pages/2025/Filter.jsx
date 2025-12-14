import React, { useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  margin: 5px;
  padding: 10px 15px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const MenuButton = styled(Button)`
  display: block;
  margin: 0 auto;
  background-color: white;
  font-size: 1.5rem;
`;

const Menu = styled.div`
  position: absolute;
  z-index: 1;
  background-color: white;
  width: 100%;
  max-width: 660px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  text-align: center;

  /* Drawer animation */
  max-height: ${({ isOpen }) => (isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.75s ease-in-out;
`;

const peopleMenu = [
  "Home",
  "Kirk and Jessica",
  "Perry & Elise",
  "Arnold, Laura & Arie",
  "Monica",
];

const Filter = ({ selectedPeople, setSelectedPeople }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (person) => {
    setSelectedPeople(person);
    setIsOpen(false);
  };

  return (
    <div style={{ backgroundColor: "white", position: "relative" }}>
      <MenuButton className="dm-sans" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <span>&times;</span> : <span>&#9776;</span>}
      </MenuButton>

      <Menu isOpen={isOpen}>
        {peopleMenu.map((person) => (
          <Button
            className="dm-sans"
            onClick={() => handleClick(person)}
            key={person}
          >
            <b>{person}</b>
          </Button>
        ))}
      </Menu>
    </div>
  );
};

export default Filter;
