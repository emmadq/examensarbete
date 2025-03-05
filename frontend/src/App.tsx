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
              <Link to="/bigdatacovidpagination">Comparison</Link>
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
        <li
          className="list-item clickable"
          onClick={() => openLinks("imageFeed")}
        >
          Image Feed
        </li>{" "}
        {openLink === "imageFeed" && (
          <ul className="submenu">
            <li>
              {" "}
              <Link to="/ShowImageFeed">Test all image list components</Link>
            </li>
            <br />
            <li>
              {" "}
              <Link to="/article">Base list</Link>
            </li>
            <li>
              {" "}
              <Link to="/articleRmemo">React.memo</Link>
            </li>
            <li>
              {" "}
              <Link to="/articleRmemoQuery">React.memo and useQuery</Link>
            </li>
            <li>
              {" "}
              <Link to="/articleRmemoCallbMemo">
                React.memo, useCallback and useMemo
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/articleLazy">Lazy loading</Link>
            </li>
            <li>
              {" "}
              <Link to="/articleInfScroll">Infinite scroll</Link>
            </li>
            <li>
              {" "}
              <Link to="/articleInfScrollCallback">
                Infinite scroll med useCallback och useMemo
              </Link>
            </li>
          </ul>
        )}
      </ul>

      <ReactQueryDevtools />
    </>
  );
}

export default App;
