import React, { useState, useEffect } from "react";
import seriousPhoto from "../../assets/seriousPhoto.jpg";
import funnyPhoto from "../../assets/funnyPhoto.jpg";

const Home = () => {
  const [displayedPhoto, setDisplayedPhoto] = useState(seriousPhoto);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedPhoto((prevPhoto) =>
        prevPhoto === seriousPhoto ? funnyPhoto : seriousPhoto
      );
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1 className="rock-salt-regular headline">Keeping up with the Ans</h1>
      </div>
      <div className="photo-wrapper">
        <img
          className="photo"
          src={displayedPhoto}
          alt={
            "The An family sitting on a porch together in Christmas sweaters."
          }
        />
      </div>
    </div>
  );
};

export default Home;
