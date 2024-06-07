import React, { useState, useEffect, useContext } from "react";
import "./cointwo.css";
import { useParams } from "react-router-dom";
import Linecharttwo from "../linecharttwo/Linecharttwo";
import { CoinContext } from "../../context/CoinContext";

const Cointwo = () => {
  const { coinId } = useParams();
  const { currency } = useContext(CoinContext);
  const [data, setdata] = useState();
  const [historicdata, sethistoricdata] = useState();
  //   console.log(data);

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
      .then((response) => setdata(response))
      .catch((err) => console.error(err));
  };

  const fatchhistoricdata = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => sethistoricdata(response))
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fatchdata();
    fatchhistoricdata();
  }, [currency]);
  if (data) {
    return (
      <div className="coin">
        <div className="coin_name">
          <img src={data.image.large} alt="" />
          <p>
            <b>
              {data.name} {currency.symbol}
            </b>
          </p>
        </div>
        <div className="coin_chart">
          <Linecharttwo historicdata={historicdata} />
        </div>
        <div className="coin_details">
          <ul>
            <li>Crtpto market rank</li>
            <li>{data.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current price</li>
            <li>
              {currency.symbol}{" "}
              {data.market_data.current_price[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market cap</li>
            <li>
              {currency.symbol}
              {data.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>{data.market_data.high_24h[currency.name].toLocaleString()}</li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>{data.market_data.low_24h[currency.name].toLocaleString()}</li>
          </ul>
        </div>
      </div>
    );
  } else {
    <div className="spinner">
      <div className="spin"></div>
    </div>;
  }
};

export default Cointwo;
