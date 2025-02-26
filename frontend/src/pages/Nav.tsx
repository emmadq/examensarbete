import { Link } from "react-router";

function Nav({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "90vh",
        padding: "0px",
        margin: "0px",
      }}
    >
      <nav style={{ padding: "1rem", backgroundColor: "#f0f0f0" }}>
        <Link to="/coviddata" style={{ marginRight: "1rem" }}>
          Covid data
        </Link>
        <Link to="/coviddatapagination" style={{ marginRight: "1rem" }}>
          Covid data with pagination
        </Link>
        <Link to="/ShowImageFeed" style={{ marginRight: "1rem" }}>
          Picture feed Test
        </Link>
        <Link to="/article" style={{ marginRight: "1rem" }}>
          Picture feed
        </Link>
        <Link to="/articleRmemo" style={{ marginRight: "1rem" }}>
          Picture feed react.memo
        </Link>
        <Link to="/articleRmemoCallbMemo" style={{ marginRight: "1rem" }}>
          Picture feed react.memo, callback and memo
        </Link>
        <Link to="/articleLazy" style={{ marginRight: "1rem" }}>
          Picture feed Lazy loading
        </Link>
        <Link to="/articleInfScroll" style={{ marginRight: "1rem" }}>
          Picture feed infinite scroll
        </Link>
        <Link to="/articleInfScrollCallback" style={{ marginRight: "1rem" }}>
          Picture feed infinite scroll med callback
        </Link>
        <Link to="/statistics">Statistics</Link>
      </nav>
      <main>{children}</main>
      <div />
    </div>
  );
}

export default Nav;
