interface CovidData {
  state: string;
  positive: number;
  id: number;
}
interface BigDataCovidTableNoMemoProps {
  order: boolean;
  dataset: CovidData[];
}

const StandalonePlain = ({ order, dataset }: BigDataCovidTableNoMemoProps) => {
  const sortedDataNoMemo = () => {
    console.time("no useMemo sort");
    const sorted = [...dataset].sort((a, b) =>
      order ? b.positive - a.positive : a.positive - b.positive
    );
    console.timeEnd("no useMemo sort");
    return sorted;
  };

  console.log("RE-RENDER");

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
          <h3>Without useMemo</h3>
          <table>
            <thead>
              <tr>
                <th>State</th>
                <th>Positives</th>
              </tr>
            </thead>
            <tbody>
              {sortedDataNoMemo().map((item, index) => (
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
export default StandalonePlain;
