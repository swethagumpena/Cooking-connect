import React from "react";
import "./Header.css";
import icon from "../../assets/icon.png";

const Header = () => {
  return (
    <header>
      <div className="title">
        <img src={icon} alt="icon" className="icon-img" />
        <h2>Cooking Connect</h2>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/new">Add recipe</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
