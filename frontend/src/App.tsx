import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import { Link } from "react-router";

function App() {
  return (
    <>
      <h3>Landing page</h3>
      <Link to="/coviddata">Covid data</Link>
      <br />
      <Link to="/coviddatamemo">Covid data Memo</Link>
      <br />
      <Link to="/coviddataquery">Covid data Query</Link>
      <br />
      <Link to="/wikiarticle">Wiki articles</Link>
      <br />
      <Link to="/statistics">Statistics</Link>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
