import { useMemo } from "react";

interface CovidData {
  state: string;
  positive: number;
  id: number;
}
interface BigDataCovidTableMemoProps {
  order: boolean;
  dataset: CovidData[];
}

const BigDataCovidTableMemo = ({
  order,
  dataset,
}: BigDataCovidTableMemoProps) => {
  const sortedDataMemoAsc = useMemo(() => {
    console.time("useMemo sort");
    const sorted = [...dataset].sort((a, b) => b.positive - a.positive);
    console.timeEnd("useMemo sort");
    return sorted;
  }, [dataset]);

  const sortedDataMemoDesc = useMemo(() => {
    console.time("useMemo sort");
    const sorted = [...dataset].sort((a, b) => a.positive - b.positive);
    console.timeEnd("useMemo sort");
    return sorted;
  }, [dataset]);

  const sortedDataMemo = order ? sortedDataMemoAsc : sortedDataMemoDesc;
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
          <h3>With useMemo</h3>
          <table>
            <thead>
              <tr>
                <th>State</th>
                <th>Positives</th>
              </tr>
            </thead>
            <tbody>
              {sortedDataMemo?.map((item) => (
                <tr key={item.id}>
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
export default BigDataCovidTableMemo;
