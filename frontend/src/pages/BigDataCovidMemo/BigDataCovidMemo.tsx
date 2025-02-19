import { useEffect, useState } from "react";
import BigDataCovidTableNoMemo from "./BigDataCovidTableNoMemo";
import BigDataCovidTableMemo from "./BigDataCovidTableMemo";

interface CovidData {
  state: string;
  positive: number;
  id: number;
}
const BigDataCovidMemo = () => {
  const [order, setOrder] = useState<boolean>(false);
  const [dataset, setDataset] = useState<CovidData[]>([]);

  const toggleOrder = () => {
    setOrder((prev) => !prev);
    console.log("\n");
  };

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
  return (
    <>
      <button onClick={toggleOrder}>Toggle sorting</button>
      <div style={{ margin: "15px", display: "flex", gap: "15px" }}>
        <BigDataCovidTableNoMemo order={order} dataset={dataset} />
        <BigDataCovidTableMemo order={order} dataset={dataset} />
      </div>
    </>
  );
};
export default BigDataCovidMemo;
