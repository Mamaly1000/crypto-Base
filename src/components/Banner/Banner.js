import React from "react";
// material ui
import { Container, makeStyles, Typography } from "@material-ui/core";
// component
import Carousel from "./carousel";
// context
import { UseStateContext } from "../../context/CryptoContext";

const usestyles = makeStyles(() => ({
  banner: {
    backgroundImage:
      "url('https://raw.githubusercontent.com/Mamaly1000/crypto-Base/master/src/components/Banner/222-min.jpg?token=GHSAT0AAAAAAB2YH7QI2YROGH2VADHT6QSQY3LYEWA')",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
    background: "rgb(0 0 0/.9)",
    backgroundBlendMode: "multipy",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner = () => {
  const classes = usestyles();
  const { colortheme } = UseStateContext();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            styles={{
              color: colortheme,
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Base
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            get all the info regarding your favorite crypto currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
