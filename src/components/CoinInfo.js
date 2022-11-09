import React, { useEffect, useState } from "react";
// axios
import axios from "axios";
// material ui
import { CircularProgress, createTheme, makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
// api
import { Historicalchart } from "../config/Api";
// context
import { UseStateContext } from "./../context/CryptoContext";
// react chart js
import { Line } from "react-chartjs-2";
// component
import SelectButton from "./SelectButton";
// days data
import { chartDays } from "../config/data";

const CoinInfo = ({ coin }) => {
  const { currency, colortheme } = UseStateContext();
  const [chart, setchart] = useState();
  const [day, setday] = useState(1);

  const fetchapi = async () => {
    const { data } = await axios.get(Historicalchart(coin.id, day, currency));
    setchart(data.prices);
  };

  useEffect(() => {
    fetchapi();
  }, [day]);

  const darktheme = createTheme({
    palette: {
      primary: { main: "#fff" },
      type: "dark",
    },
  });

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 40,
      marginTop: 25,

      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={darktheme}>
      <div className={classes.container}>
        {!chart ? (
          <CircularProgress
            style={{ color: colortheme }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: chart.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return day === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: chart.map((coin) => coin[1]),
                    label: `Price ( Past ${day} Days ) in ${currency}`,
                    borderColor: colortheme,
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
                flexWrap: "wrap",
                rowGap: 10,
                columnGap: 10,
                textAlign: "center",
              }}
            >
              {chartDays.map((days) => (
                <SelectButton
                  key={days.value}
                  onClick={() => {
                    setday(days.value);
                  }}
                  selected={days.value === day}
                  colortheme={colortheme}
                >
                  {days.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
