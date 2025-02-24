import "./App.css";
import { Link } from "react-router";
function App() {
  return (
    <>
      <h3>Landing page</h3>
      <Link to="/coviddata">Covid data</Link>
      <br />
      <Link to="/coviddatapagination">Covid data with pagination</Link>
      <br />
      <Link to="/ShowImageFeed">Picture feed Test</Link>
      <br />
      <Link to="/article">Picture feed</Link>
      <br />
      <Link to="/articleRmemo">Picture feed react.memo</Link>
      <br />
      <Link to="/articleRmemoCallbMemo">
        Picture feed react.memo, callback and memo
      </Link>

      <br />
      <Link to="/articleLazy">Picture feed Lazy loading</Link>
      <br />
      <Link to="/articleInfScroll">Picture feed infinite scroll</Link>
      <br />
      <Link to="/statistics">Statistics</Link>
    </>
  );
}

export default App;
