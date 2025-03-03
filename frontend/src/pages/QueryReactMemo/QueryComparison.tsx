import BigDataCovidMemoQuery from "./BigDataCovidMemoQuery";
import BigDataCovidQuery from "./BigDataCovidQuery";
import BigDataCovidReactMemo from "./BigDataCovidReactMemo";

const QueryComparison = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        gap: "30px",
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <div>
        <h4>React Memo + useQuery</h4>
        <BigDataCovidMemoQuery />
      </div>
      <div>
        <h4>useQuery</h4>
        <BigDataCovidQuery />
      </div>
      <div>
        <h4>React Memo</h4>
        <BigDataCovidReactMemo />
      </div>
    </div>
  );
};
export default QueryComparison;
