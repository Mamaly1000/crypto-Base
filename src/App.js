import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
// styling materials
import { makeStyles } from "@material-ui/core/styles";
// components
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage.js";
// context
import CryptoContext from "./context/CryptoContext";

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "#fff",
      minHeight: "100vh",
    },
  }));

  const Classes = useStyles();

  return (
    <CryptoContext>
      <div className={Classes.App}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </CryptoContext>
  );
}

export default App;
