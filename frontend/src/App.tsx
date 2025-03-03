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
      <h4 onClick={() => openLinks("pagination")}>
        Covid data with pagination{" "}
      </h4>
      {openLink === "pagination" ? (
        <>
          <Link to="/coviddatapaginationstandalone">With Pagination</Link>
          <br />
          <Link to="/coviddatanopagination">No Pagination</Link>
          <br />
          <Link to="/BigDataCovidPaginationL">Comparison</Link>
          <br />
        </>
      ) : (
        <> </>
      )}
      <h4 onClick={() => openLinks("querymemo")}>With Query and React.M;emo</h4>
      {openLink === "querymemo" ? (
        <>
          <Link to="/covidreactmemo">With React.memo</Link>
          <br />
          <Link to="/coviddatamq">With React.memo + useQuery</Link>
          <br />
          <Link to="/coviddataquery">With useQuery</Link>
          <br />
          <Link to="/querycomparison">Comparison</Link>
        </>
      ) : (
        <> </>
      )}
      <h4 onClick={() => openLinks("imageFeed")}>Image feed</h4>
      {openLink === "imageFeed" ? (
        <>
          <Link to="/ShowImageFeed">Test all image list components</Link>
          <br />
          <br />
          <Link to="/article">Base list</Link>
          <br />
          <Link to="/articleRmemo">React.memo</Link>
          <br />
          <Link to="/articleRmemoQuery">React.memo and useQuery</Link>
          <br />
          <Link to="/articleRmemoCallbMemo">
            React.memo, useCallback and useMemo
          </Link>
          <br />
          <Link to="/articleLazy">Lazy loading</Link>
          <br />
          <Link to="/articleInfScroll">Infinite scroll</Link>
          <br />
          <Link to="/articleInfScrollCallback">
            Infinite scroll med useCallback och useMemo
          </Link>
          <br />
        </>
      ) : (
        <> </>
      )}

      <ReactQueryDevtools />
    </>
  );
}

export default App;
