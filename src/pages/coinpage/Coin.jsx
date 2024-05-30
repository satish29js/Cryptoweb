import React, { useContext, useEffect, useState } from "react";
import "./coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import Linechart from "../../Components/linechart/Linechart";

const Coin = () => {
  const [coindata, setcoindata] = useState();
  const [historical, sethistorical] = useState();
  const { currency } = useContext(CoinContext);
  const { coinId } = useParams();
  // console.log(coindata);
  // console.log(historical);
  const fatchdata = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-TjYVeSDH2p9JVRUttUeaY3nN",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setcoindata(response))
      .catch((err) => console.error(err));
  };

  const fatchhisroricaldata = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => sethistorical(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fatchdata();
    fatchhisroricaldata();
  }, [currency]);

  if (coindata && historical) {
    return (
      <div className="coin">
        <div className="coin_name">
          <img src={coindata.image.large} alt="img" />
          <p>
            <b>
              {coindata.name} ({currency.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin_chart">
          <Linechart historical={historical} />
        </div>
        <div className="coin_info">
          <ul>
            <li>Crypto market rank</li>
            <li>{coindata.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current price</li>
            <li>
              {currency.symbol}
              {coindata.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market cap</li>
            <li>
              {currency.symbol}
              {coindata.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>
              {currency.symbol}
              {coindata.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour Low </li>
            <li>
              {currency.symbol}
              {coindata.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
