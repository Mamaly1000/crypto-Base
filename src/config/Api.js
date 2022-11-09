import axios from "axios";

export const coinlist = async (currency) => {
  const list = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C12h%2C24h`
  );

  return list.data;
};
export const TrendingCoins = async (currency) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
  );
  return data;
};
export const Historicalchart = (id, days = 365, currency) => {
  return `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
};
export const singlecoin = (id) => {
  return `https://api.coingecko.com/api/v3/coins/${id}`;
};
