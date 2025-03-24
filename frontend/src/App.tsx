import "./App.css";
import { Link } from "react-router";

function App() {
  return (
    <>
      <h2 className="page-title">Examensarbete - Optimization Methods</h2>
      <Link to="/coviddatalist">Covid data list </Link> <br />
      <Link to="/imageFeedList">Image feed list</Link>
    </>
  );
}

export default App;
