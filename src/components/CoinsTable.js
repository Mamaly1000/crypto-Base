import React, { useEffect, useState } from "react";
// material ui
import {
  Container,
  createTheme,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
// react router dom
import { useNavigate } from "react-router-dom";
// api
import { coinlist } from "../config/Api";
// context
import { UseStateContext } from "../context/CryptoContext.js";
// helper function
import { numberwithcommas } from "./Banner/carousel";

const CoinsTable = () => {
  const { currency, symbol, colortheme } = UseStateContext();
  const [Coinlist, setCoinlist] = useState([]);
  const [loading, setloading] = useState(false);
  const [search, setsearch] = useState("");
  const [pagination, setpagination] = useState(1);

  useEffect(() => {
    const fetchapi = async () => {
      setloading(true);
      setCoinlist(await coinlist(currency));
      setloading(false);
    };
    fetchapi();
  }, [currency]);

  const darktheme = createTheme({
    palette: {
      primary: { main: "#fff" },
      type: "dark",
    },
  });

  const useStyles = makeStyles(() => ({
    row: {
      cursor: "pointer",
      backgroundColor: "#16171a",
      "&:hover": {
        boxShadow: "10px 0 10px black,-10px 0 10px black",
        backgroundColor: "#131111",
        zIndex: 100,
      },
      fontFamily: "montserrat",
      transition: "background-color .13s linear,box-shadow .13s linear",
      borderBottom: `.001rem solid ${colortheme}}`,
      animation: "tablerowanimation .5s ease 1",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: colortheme,
      },
    },
  }));

  const classes = useStyles();

  const filtering = () => {
    return (
      Coinlist.filter((coin) => coin.name.toLowerCase().includes(search)) ||
      Coinlist.filter((coin) => coin.symbol.toLowerCase().includes(search))
    );
  };

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={darktheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{
            margin: 18,
            fontFamily: "montserrat",
            textTransform: "capitalize",
          }}
        >
          Cryptocurrency prices by market cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency ..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <>
              <LinearProgress style={{ background: colortheme }} />
            </>
          ) : (
            <>
              <Table>
                <TableHead style={{ background: colortheme, color: "#fff" }}>
                  <TableRow style={{ background: "transparent" }}>
                    {["Coin", "Price", "24H Change", "Market Cap"].map(
                      (data) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontFamily: "montserrat",
                          }}
                          key={data}
                          align={data === "Coin" ? "left" : "right"}
                        >
                          {data}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtering()
                    .slice((pagination - 1) * 10, (pagination - 1) * 10 + 10)
                    .map((coin) => (
                      <TableRow
                        onClick={() => {
                          navigate(`/coins/${coin.id}`);
                        }}
                        className={classes.row}
                        key={coin.id}
                      >
                        <TableCell
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 15,
                            borderWidth: "0",
                          }}
                          component="th"
                          scope="row"
                        >
                          <img
                            src={coin.image}
                            alt={coin.name}
                            height="50"
                            style={{ marginBottom: 10, width: "50px" }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {coin.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {coin.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell style={{ borderWidth: "0" }} align="right">
                          {symbol}{" "}
                          {numberwithcommas(coin.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          align="right"
                          style={{
                            color:
                              coin.price_change_percentage_24h > 0
                                ? "rgb(32 207 191)"
                                : "rgb(191 42 93)",
                            fontWeight: 500,
                            borderWidth: "0",
                          }}
                        >
                          {coin.price_change_percentage_24h > 0 && "+"}{" "}
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell style={{ borderWidth: "0" }} align="right">
                          {symbol}{" "}
                          {numberwithcommas(
                            coin.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </>
          )}
        </TableContainer>
      </Container>
      <Pagination
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        classes={{ ul: classes.pagination }}
        count={filtering().length / 10}
        onChange={(_, value) => {
          setpagination(value);
          window.scroll(0, 450);
        }}
      />
    </ThemeProvider>
  );
};

export default CoinsTable;
