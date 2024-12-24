import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../dashboard.css';
import { Link } from "react-router-dom";

const Menu = () => {
  const userName = localStorage.getItem("loggedInUser");
  const [dropOpen, setDropOpen] = useState(false)
  const [selectmenu, setSelectMenu] = useState(0);
  const [isopen, setIsopen] = useState(false);

  const navigate = useNavigate();
  const toggleDropdown = () => {
    console.log(dropOpen);
    
    setDropOpen(!dropOpen);
    console.log(dropOpen);
    
  };


  const handleMenuClick = (index) => {
    setSelectMenu(index);
  };

  const toggleMenu = () => {
    setIsopen(!isopen);
  };

  const onSignOut = () => {
    console.log("Hello");
    localStorage.removeItem("UserId")
    localStorage.removeItem("loggedInUser")
    localStorage.removeItem("token:")
    navigate("/dashboard/LoginUp")

  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 650px)");
    const handleResize = () => {
      if (mediaQuery.matches) {
        setIsopen(true); 
      } else {
        setIsopen(false); 
      }
    };
    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <span>
        <img
          className="logo"
          src="/logo.webp"
          style={{ height: "3rem", width: "4rem", backgroundColor: "black" }}
          alt="BullCraft Logo"
        />
      </span>
      <div className="menus">
        <span>
          {isopen ? (
            <i className="fa-regular fa-circle-xmark" onClick={toggleMenu}></i>
          ) : (
            <i className="fa-solid fa-bars" onClick={toggleMenu}></i>
          )}
        </span>
        <div className={`inner-menus ${isopen ? "open" : ""}`}>
          <ul>
            <li>
              <Link
                style={{ textDecoration: "none" }}
                onClick={() => handleMenuClick(0)}
                to="/dashboard/HomeIndex"
              >
                <p className={selectmenu === 0 ? activeMenuClass : menuClass}>
                  Dashboard
                </p>
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: "none" }}
                onClick={() => handleMenuClick(1)}
                to="/dashboard/Orders"
              >
                <p className={selectmenu === 1 ? activeMenuClass : menuClass}>
                  Orders
                </p>
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: "none" }}
                onClick={() => handleMenuClick(2)}
                to="/dashboard/Holdings"
              >
                <p className={selectmenu === 2 ? activeMenuClass : menuClass}>
                  Holdings
                </p>
              </Link>
            </li>
            <li>
              <Link
                style={{ textDecoration: "none" }}
                onClick={() => handleMenuClick(5)}
                to="/dashboard/Apps"
              >
                <p className={selectmenu === 5 ? activeMenuClass : menuClass}>
                  App
                </p>
              </Link>
            </li>
          </ul>
        </div>
        <hr />
        <div className="profile">
          <div className="avatar">{userName[0]}</div>
          <div className="dropdown-container">
            <p className="username" onClick={toggleDropdown}>
              {userName}
            </p>
            {dropOpen && (
                <a className="dropdown-item" onClick={onSignOut}>
                  SignOut
                </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Menu



