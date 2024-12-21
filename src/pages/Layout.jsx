import { Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Layout = ({ objList }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  return (
    <>
      {!isMobile ? (
        <nav className="nav-menu">
          <div className="lexend-deca">
            <Link to="/" className="link">
              Home
            </Link>
          </div>
          {objList.map((article) => {
            console.log(article);

            return (
              <div key={article.objName} className="lexend-deca">
                <Link to={`/${article.objName}`} className="link">
                  {article.data[0].sv_display_name}
                </Link>
              </div>
            );
          })}
        </nav>
      ) : (
        <div className="hamburger-menu">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem key={"home"}>
              <Link to="/" className="link">
                Home
              </Link>
            </MenuItem>
            {objList.map((article) => {
              return (
                <MenuItem key={article.objName}>
                  <Link to={`/${article.objName}`} className="link">
                    {article.data[0].sv_display_name}
                  </Link>
                </MenuItem>
              );
            })}
          </Menu>
        </div>
      )}

      <Outlet />
    </>
  );
};

export default Layout;
