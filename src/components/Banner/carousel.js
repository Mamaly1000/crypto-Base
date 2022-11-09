import React, { useEffect, useState } from "react";
// material ui
import { makeStyles } from "@material-ui/core";
// context
import { UseStateContext } from "../../context/CryptoContext.js";
// api
import { TrendingCoins } from "../../config/Api";
// carousel
import AliceCarousel from "react-alice-carousel";
// react router dom
import { Link } from "react-router-dom";

export const numberwithcommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Carousel = () => {
  const { currency, symbol, colortheme } = UseStateContext();
  const [Trending, setTrending] = useState([]);

  const usestyles = makeStyles(() => ({
    carousel: {
      height: "50%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: colortheme,
      fontWeight: "400",
    },
  }));

  const classes = usestyles();

  useEffect(() => {
    const fetcgapi = async () => {
      setTrending(await TrendingCoins(currency));
    };
    fetcgapi();
  }, [currency]);

  const items = Trending.map((coin) => (
    <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
      <img
        src={coin.image}
        alt={coin.name}
        height="80"
        style={{ marginBottom: 10 }}
      />
      <span>
        {coin.symbol} &nbsp;{" "}
        <span
          style={{
            color:
              coin.price_change_percentage_24h > 0
                ? "rgb(32 207 191)"
                : "rgb(191 42 93)",
            fontWeight: "700",
          }}
        >
          {coin.price_change_percentage_24h >= 0 && "+"}{" "}
          {coin.price_change_percentage_24h.toFixed(2)}%
        </span>{" "}
      </span>
      <span style={{ fontSize: 22, fontWeight: 500 }}>
        {symbol} {numberwithcommas(coin.current_price.toFixed(2))}
      </span>
    </Link>
  ));

  const responsive = {
    0: {
      items: 2,
    },
    550: {
      items: 4,
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        autoPlay
        responsive={responsive}
        items={items}
        disableButtonsControls
      />
    </div>
  );
};

export default Carousel;
