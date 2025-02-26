import { memo, useEffect, useState } from "react";

interface CovidData {
  state: string;
  positive: number;
  id: number;
}

const ReactMemo = () => {
  const [dataset, setDataset] = useState<CovidData[]>([]);

  useEffect(() => {
    const fetchDataset = async () => {
      const response = await fetch(
        "https://api.covidtracking.com/v1/states/daily.json"
      );
      const data = await response.json();
      setDataset(data);
    };

    fetchDataset();
  }, []);

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
              {dataset.map((item, index) => (
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
export default memo(ReactMemo);
