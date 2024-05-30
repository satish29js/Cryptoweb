import React, { useContext, useState, useEffect } from "react";
import "./home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allcoins, currency } = useContext(CoinContext);

  const [display, setdisplay] = useState([]);
  const [input, setinput] = useState("");

  const handelsubmit = async (e) => {
    e.preventDefault();
    const coins = await allcoins.filter((item, index) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setdisplay(coins);
  };

  const handelinput = (event) => {
    setinput(event.target.value);
    if (event.target.value === "") {
      setdisplay(allcoins);
    }
  };

  useEffect(() => {
    setdisplay(allcoins);
  }, [allcoins]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br />
          Crypto MarketPlace
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
          doloribus.
        </p>
        <form onSubmit={handelsubmit}>
          <input
            onChange={handelinput}
            value={input}
            type="text"
            name=""
            id=""
            list="coinlist"
            required
            placeholder="Ceypto serch...."
          />

          <datalist id="coinlist">
            {allcoins.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>

          <button>Search</button>
        </form>
      </div>
      <div className="crypto_table">
        <div className="table_layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="marketcap"> Market Place</p>
        </div>
        {display.slice(0, 10).map((item, i) => (
          <Link to={`/coin/${item.id}`} className="table_layout" key={i}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="img" />
              <p>{item.name} </p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
              style={{ textAlign: "center" }}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}{" "}
            </p>
            <p className="marketcap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
