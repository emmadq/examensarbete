import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Link } from "react-router";
import BigDataCovid from "./pages/BigDataCovid";

function App() {
  return (
    <>
      <h3>Landing page</h3>
      <Link to="/coviddata">Covid data</Link>
      <br />
      <Link to="/wikiarticle">Wiki articles</Link>
      <br />
      <Link to="/statistics">Statistics</Link>
    </>
  );
}

export default App;
