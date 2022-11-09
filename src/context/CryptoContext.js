import { createContext, useContext, useEffect, useState } from "react";

const cryptContext = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setcurrency] = useState("usd");
  const [symbol, setsymbol] = useState("$");
  const [colortheme, setcolortheme] = useState("#7352FF");

  useEffect(() => {
    currency === "usd" ? setsymbol("$") : setsymbol("₹");
    currency === "" && setcurrency("usd");
    currency === "" && setsymbol("$");
  }, [currency]);

  return (
    <cryptContext.Provider
      value={{ colortheme, setcolortheme, currency, symbol, setcurrency }}
    >
      {children}
    </cryptContext.Provider>
  );
};
export default CryptoContext;
export const UseStateContext = () => {
  return useContext(cryptContext);
};
