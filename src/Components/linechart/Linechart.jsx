import React, { useState, useEffect } from "react";
import "./linechart.css";
import Chart from "react-google-charts";

const Linechart = ({ historical }) => {
  //   console.log(historical.prices[1]);
  //   historical.map((item) => {
  //     console.log(item);
  //   });
  const [data, setdata] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let datacopy = [["Date", "Prices"]];
    if (historical.prices) {
      historical.prices.map((item) => {
        datacopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1],
        ]);
      });
      setdata(datacopy);
    }
  }, [historical]);
  return <Chart chartType="LineChart" data={data} height="100%" legendToggle />;
};

export default Linechart;
