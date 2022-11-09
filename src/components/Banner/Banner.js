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
      "url('https://www.coindesk.com/resizer/Fs1ilBzEMAe0LccFA6zJR36fRxA=/567x248/filters:quality(80):format(jpg)/cloudfront-us-east-1.images.arcpublishing.com/coindesk/LNZLKXIPOZGKBHW6LWEBN73DA4.png')",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat",
    backgroundSize: "50% 50%",
    backgroundPosition: "top",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
    background: "rgb(0 0 0/.6)",
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
