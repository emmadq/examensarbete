import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import { Link } from "react-router";
import { useState } from "react";

function App() {
  const [openLink, setOpenLink] = useState("");
  const openLinks = (links: string) => {
    if (links === openLink) {
      setOpenLink("");
    } else {
      setOpenLink(links);
    }
  };
  return (
    <>
      <h3>Landing page</h3>

      <h4 onClick={() => openLinks("callback")}>Covid data with useCallback</h4>
      {openLink === "callback" ? (
        <>
          <Link to="/covidcallback?version=standalone">
            Callback standalone
          </Link>
          <br />
          <Link to="/covidcallback?version=comparison">
            Callback comparison
          </Link>
          <br />
          <Link to="/covidcallback?version=plain">Plain standalone</Link>
          <br />
        </>
      ) : (
        <> </>
      )}
      <h4 onClick={() => openLinks("memo")}>Covid data with useMemo</h4>
      {openLink === "memo" ? (
        <>
          <Link to="/covidmemo?version=standalone">Memo standalone</Link>
          <br />
          <Link to="/covidmemo?version=comparison">Memo comparison</Link>
          <br />
          <Link to="/covidmemo?version=plain">Plain standalone</Link>
          <br />
        </>
      ) : (
        <> </>
      )}

      <Link to="/coviddata">Covid data</Link>
      <br />
      <Link to="/coviddatamemo">Covid data Memo</Link>
      <br />
      <br />
      <Link to="/coviddatamq">Covid data Memo Query</Link>
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
