import React, { useContext } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import arrow_icon from "../assets/arrow_icon.png";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setcurrency } = useContext(CoinContext);

  const handelchangecoin = (event) => {
    switch (event.target.value) {
      case "usd": {
        setcurrency({
          name: "usd",
          symbol: "$",
        });
        break;
      }
      case "eur": {
        setcurrency({
          name: "eur",
          symbol: "%",
        });
        break;
      }
      case "inr": {
        setcurrency({
          name: "inr",
          symbol: "@",
        });
        break;
      }

      default: {
        setcurrency({
          name: "usd",
          symbol: "$",
        });
        break;
      }
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="logo img" />
      </Link>

      <ul>
        <li>
          {" "}
          <Link to="/">Home</Link>
        </li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav_right">
        <select onChange={handelchangecoin}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button>
          Sign Up <img src={arrow_icon} alt="" className="arrow_icon" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
