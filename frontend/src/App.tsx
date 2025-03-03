import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import { Link } from "react-router";
import { useState } from "react";

function App() {
  const [openLink, setOpenLink] = useState<string>("");

  const openLinks = (links: string) => {
    if (links === openLink) {
      setOpenLink("");
    } else {
      setOpenLink(links);
    }
  };

  return (
    <>
      <h2 className="page-title">Examensarbete - Optimization Methods</h2>

      <ul className="menu">
        <li
          className="list-item clickable"
          onClick={() => openLinks("callback")}
        >
          Covid Data with useCallback
        </li>
        {openLink === "callback" && (
          <ul className="submenu">
            <li>
              <Link to="/covidcallback?version=standalone">
                Callback Standalone
              </Link>
            </li>
            <li>
              <Link to="/covidcallback?version=comparison">
                Callback Comparison
              </Link>
            </li>
            <li>
              <Link to="/covidcallback?version=plain">Plain Standalone</Link>
            </li>
          </ul>
        )}

        <li className="list-item clickable" onClick={() => openLinks("memo")}>
          Covid Data with useMemo
        </li>
        {openLink === "memo" && (
          <ul className="submenu">
            <li>
              <Link to="/covidmemo?version=standalone">Memo Standalone</Link>
            </li>
            <li>
              <Link to="/covidmemo?version=comparison">Memo Comparison</Link>
            </li>
            <li>
              <Link to="/covidmemo?version=plain">Plain Standalone</Link>
            </li>
          </ul>
        )}

        <li
          className="list-item clickable"
          onClick={() => openLinks("pagination")}
        >
          Covid Data with Pagination
        </li>
        {openLink === "pagination" && (
          <ul className="submenu">
            <li>
              <Link to="/coviddatapaginationstandalone">With Pagination</Link>
            </li>
            <li>
              <Link to="/coviddatanopagination">No Pagination</Link>
            </li>
            <li>
              <Link to="/BigDataCovidPaginationL">Comparison</Link>
            </li>
          </ul>
        )}

        <li
          className="list-item clickable"
          onClick={() => openLinks("querymemo")}
        >
          With Query and React.Memo
        </li>
        {openLink === "querymemo" && (
          <ul className="submenu">
            <li>
              <Link to="/covidreactmemo">With React.memo</Link>
            </li>
            <li>
              <Link to="/coviddatamq">With React.memo + useQuery</Link>
            </li>
            <li>
              <Link to="/coviddataquery">With useQuery</Link>
            </li>
            <li>
              <Link to="/querycomparison">Comparison</Link>
            </li>
          </ul>
        )}

        <li className="list-item">
          <Link to="/ReactQueryWithLocalStorage">
            React Query with Local Storage
          </Link>
        </li>
        <li className="list-item">
          <Link to="/coviddata">Covid Data</Link>
        </li>
        <li className="list-item">
          <Link to="/ShowImageFeed">Picture Feed Test</Link>
        </li>
        <li className="list-item">
          <Link to="/article">Picture Feed</Link>
        </li>
        <li className="list-item">
          <Link to="/articleRmemo">Picture Feed React.memo</Link>
        </li>
        <li className="list-item">
          <Link to="/articleRmemoCallbMemo">
            Picture Feed React.memo, Callback and Memo
          </Link>
        </li>
        <li className="list-item">
          <Link to="/articleLazy">Picture Feed Lazy Loading</Link>
        </li>
        <li className="list-item">
          <Link to="/articleInfScroll">Picture Feed Infinite Scroll</Link>
        </li>
        <li className="list-item">
          <Link to="/articleInfScrollCallback">
            Picture Feed Infinite Scroll with Callback
          </Link>
        </li>
        <li className="list-item">
          <Link to="/statistics">Statistics</Link>
        </li>
      </ul>

      <ReactQueryDevtools />
    </>
  );
}

export default App;
