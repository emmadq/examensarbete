import BigDataCovidMemoQuery from "../BigDataCovidMemoQuery";
import BigDataCovidQuery from "../BigDataCovidQuery";
import BigDataCovidReactMemo from "./BigDataCovidReactMemo";

const QueryComparison = () => {
  return (
    <div style={{ display: "flex" }}>
      <>
        <h4>React Memo + useQuery</h4>
        <BigDataCovidMemoQuery />
      </>
      <>
        <h4>useQuery</h4>
        <BigDataCovidQuery />
      </>
      <>
        <h4>React Memo</h4>
        <BigDataCovidReactMemo />
      </>
    </div>
  );
};
export default QueryComparison;
