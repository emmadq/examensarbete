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
      <Link to="/wikiarticle">Picture feed</Link>
      <br />
      <Link to="/statistics">Statistics</Link>
    </>
  );
}

export default App;
