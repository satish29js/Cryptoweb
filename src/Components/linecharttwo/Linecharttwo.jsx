import React, { useState, useEffect } from "react";
import Chart from "react-google-charts";

const Linecharttwo = ({ historicdata }) => {
  console.log(historicdata);
  const [data, setdata] = useState([["Date", "Prices"]]);

  useEffect(() => {
    let datacopy = [["Date", "Prices"]];
    if (historicdata.prices) {
      historicdata.prices.map((item) => {
        datacopy.push([
          `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
          item[1],
        ]);
      });
      setdata(datacopy);
    }
  }, [historicdata]);
  return <Chart chartType="LineChart" data={data} height="100%" legendToggle />;
};

export default Linecharttwo;
