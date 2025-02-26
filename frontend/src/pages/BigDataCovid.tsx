import { useMemo, useEffect, useState } from "react";

interface CovidData {
  state: string;
  positive: number;
  id: number;
}

export default function BigDataCovid() {
  const [dataset, setDataset] = useState<CovidData[]>([]);
  const [order, setOrder] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.covidtracking.com/v1/states/daily.json"
      );
      const data: CovidData[] = await response.json();
      setDataset(data);
    };

    fetchData();
  }, []);

  const toggleOrder = () => {
    setOrder((prev) => !prev);
    console.log("\n");
  };
  const sortedDataNoMemo = () => {
    console.time("no useMemo sort");
    const sorted = [...dataset].sort((a, b) =>
      order ? b.positive - a.positive : a.positive - b.positive
    );
    console.timeEnd("no useMemo sort");
    return sorted;
  };
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
      <button onClick={toggleOrder}>Toggle Sort Order</button>
      <div style={{ display: "flex", gap: "5px" }}>
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
                  <td>{item.state}</td>
                  <td>{item.positive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
              {sortedDataNoMemo().map((item) => (
                <tr key={item.id}>
                  <td>{item.state}</td>
                  <td>{item.positive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
