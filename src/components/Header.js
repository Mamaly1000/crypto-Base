import React, { useState } from "react";
// material ui
import {
  AppBar,
  Container,
  makeStyles,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@material-ui/core";
// react router dom
import { useNavigate } from "react-router-dom";
// theme colors data
import { themecolors } from "../config/data";
// context
import { UseStateContext } from "../context/CryptoContext";

const Header = () => {
  const [colorcontainer, setcolorcontainer] = useState(false);
  const { setcurrency, currency, colortheme, setcolortheme } =
    UseStateContext();

  const useStyles = makeStyles((theme) => ({
    title: {
      flex: 1,
      color: colortheme,
      fontWeight: "bold",
      cursor: "pointer",
    },
    colorcontainer: {
      width: 30,
      height: 30,
      borderRadius: "50%",
      backgroundColor: colortheme,
      marginRight: 10,
      cursor: "pointer",
    },
    themesetting: {
      width: "30%",
      height: 50,
      position: "absolute",
      background: "rgba(0 0 0 /.5)",
      bottom: "-60%",
      right: 40,
      borderRadius: 10,
      padding: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 10,
      [theme.breakpoints.down("md")]: {
        width: "80%",
      },
      animation: "themesettinganimation .13s linear 1",
    },
  }));

  const classes = useStyles();

  const navigate = useNavigate();

  const darktheme = createTheme({
    palette: {
      primary: { main: "#fff" },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darktheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate("/")}
              className={classes.title}
              variant="h6"
            >
              Crypto Base
            </Typography>
            <div
              onClick={() => {
                setcolorcontainer((prev) => !prev);
              }}
              className={classes.colorcontainer}
            ></div>
            {colorcontainer && (
              <div className={classes.themesetting}>
                {themecolors.map((color, index) => (
                  <button
                    type="button"
                    key={index}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: color.color,
                      cursor: "pointer",
                      fontWeight: "700",
                      color: "#fff",
                    }}
                    onClick={() => {
                      setcolorcontainer(false);
                      setcolortheme(color.color);
                    }}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            )}
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
                color: "#fff",
              }}
              value={currency}
              onClick={(e) => {
                setcurrency(e.target.value);
              }}
            >
              <MenuItem selected value={"usd"}>
                usd
              </MenuItem>
              <MenuItem value={"inr"}>inr</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
