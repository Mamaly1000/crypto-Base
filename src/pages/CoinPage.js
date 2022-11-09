import React, { useEffect, useState } from "react";
// material ui
import {
  createTheme,
  LinearProgress,
  makeStyles,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
// axios
import axios from "axios";
// react router dom
import { useParams } from "react-router-dom";
// component
import CoinInfo from "../components/CoinInfo";
// api
import { singlecoin } from "../config/Api";
// html parser
import parse from "html-react-parser";
// context
import { UseStateContext } from "../context/CryptoContext";
// helper function
import { numberwithcommas } from "../components/Banner/carousel";

const CoinPage = () => {
  const { currency, symbol, colortheme } = UseStateContext();
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const fetchCoin = async () => {
    const { data } = await axios.get(singlecoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: `2px solid ${colortheme}`,
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      flexDirection: "column",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const darktheme = createTheme({
    palette: {
      primary: { main: "#03C9D7" },
      type: "dark",
    },
  });

  const classes = useStyles();
  const parse = require("html-react-parser");

  if (!coin) return <LinearProgress style={{ backgroundColor: colortheme }} />;
  return (
    <ThemeProvider theme={darktheme}>
      <div className={classes.container}>
        <div className={classes.sidebar}>
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" className={classes.heading}>
            {coin?.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.description}>
            {parse(`${coin?.description.en.split(". ")[0]}`)}
          </Typography>
          <div className={classes.marketData}>
            <span
              style={{
                marginBottom: 10,
                borderBottom: `.0001rem solid ${colortheme}`,
                display: "flex",
                color: colortheme,
              }}
            >
              <Typography variant="h5" className={classes.heading}>
                Rank :
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{ fontFamily: "montserrat" }}>
                {coin?.market_cap_rank}
              </Typography>
            </span>
            <span
              style={{
                marginBottom: 10,
                borderBottom: `.0001rem solid ${colortheme}`,
                display: "flex",
                color: colortheme,
              }}
            >
              <Typography variant="h5" className={classes.heading}>
                Current Price :
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{ fontFamily: "montserrat" }}>
                {symbol}{" "}
                {numberwithcommas(coin?.market_data.current_price[currency])}
              </Typography>
            </span>
            <span
              style={{
                marginBottom: 10,
                borderBottom: `.0001rem solid ${colortheme}`,
                display: "flex",
                color: colortheme,
              }}
            >
              <Typography variant="h5" className={classes.heading}>
                Market Cap :
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{ fontFamily: "montserrat" }}>
                {symbol}{" "}
                {numberwithcommas(
                  coin?.market_data.market_cap[currency].toString().slice(0, -6)
                )}
                M
              </Typography>
            </span>
          </div>
        </div>
        <CoinInfo coin={coin} />
      </div>
    </ThemeProvider>
  );
};

export default CoinPage;
