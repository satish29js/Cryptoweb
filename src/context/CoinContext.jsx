import { createContext, useState, useEffect } from "react";

export const CoinContext = createContext();

const CoincontextProvider = (props) => {
  const [allcoins, setallcoins] = useState([]);
  const [currency, setcurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fatchdata = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-TjYVeSDH2p9JVRUttUeaY3nN",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setallcoins(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fatchdata();
  }, [currency]);

  const CoinValue = {
    allcoins,
    currency,
    setcurrency,
  };
  return (
    <CoinContext.Provider value={CoinValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoincontextProvider;

// import { createContext } from "react";
// import React, { useState, useEffect } from "react";

// export const CoinContext = createContext();

// const ConinContextProvider = (props) => {
//   const [allcoin, setallcoin] = useState([]);
//   const [currency, setcurrency] = useState({
//     name: "usd",
//     symbol: "$",
//   });

//   const fatchAllcoin = async () => {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         "x-cg-demo-api-key": "CG-TjYVeSDH2p9JVRUttUeaY3nN",
//       },
//     };

//     fetch(
//       `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
//       options
//     )
//       .then((response) => response.json())
//       .then((response) => setallcoin(response))
//       .catch((err) => console.error(err));
//   };

//   useEffect(() => {
//     fatchAllcoin();
//   }, [currency]);

//   const contextvalue = {
//     allcoin,
//     currency,
//     setcurrency,
//   };
//   return (
//     <CoinContext.Provider value={contextvalue}>
//       {props.children}
//     </CoinContext.Provider>
//   );
// };
// export default ConinContextProvider;
