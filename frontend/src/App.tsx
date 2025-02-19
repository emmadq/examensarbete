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
      <Link to="/article">Picture feed</Link>
      <br />
      <Link to="/articleLazy">Picture feed Lazy loading</Link>
      <br />
      <Link to="/articlePagi">Picture feed Pagination</Link>
      <br />
      <Link to="/statistics">Statistics</Link>
    </>
  );
}

export default App;
