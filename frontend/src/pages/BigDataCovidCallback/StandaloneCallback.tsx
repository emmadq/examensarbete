import { useCallback } from "react";

interface CovidData {
  state: string;
  positive: number;
  id: number;
}
interface BigDataCovidTableMemoProps {
  order: boolean;
  dataset: CovidData[];
}

const StandaloneCallback = ({ order, dataset }: BigDataCovidTableMemoProps) => {
  const sortedDataCallbackAsc = useCallback(() => {
    console.time("useMemo sort");
    const sorted = [...dataset].sort((a, b) => b.positive - a.positive);
    console.timeEnd("useMemo sort");
    return sorted;
  }, [dataset]);

  const sortedDataCallbackDesc = useCallback(() => {
    console.time("useMemo sort");
    const sorted = [...dataset].sort((a, b) => a.positive - b.positive);
    console.timeEnd("useMemo sort");
    return sorted;
  }, [dataset]);

  const sortedDataMemo = order
    ? sortedDataCallbackAsc()
    : sortedDataCallbackDesc();
  console.log("RE-RENDER ");

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "5px",
          border: "white 1px solid",
          padding: "10px",
          borderRadius: "15px",
        }}
      >
        <div>
          <h3>With useCallback</h3>
          <table>
            <thead>
              <tr>
                <th>State</th>
                <th>Positives</th>
              </tr>
            </thead>
            <tbody>
              {sortedDataMemo?.map((item, index) => (
                <tr key={index}>
                  <th>{item.state}</th>
                  <th>{item.positive}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default StandaloneCallback;
