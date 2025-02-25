import { useEffect, useState } from "react";
import BigDataCovidTableNoCallback from "./BigDataCovidTableNoCallback";
import BigDataCovidTableCallBack from "./BigDataCovidTableCallback";

interface CovidData {
  state: string;
  positive: number;
  id: number;
}
const BigDataCovidCallback = () => {
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
        <BigDataCovidTableNoCallback order={order} dataset={dataset} />
        <BigDataCovidTableCallBack order={order} dataset={dataset} />
      </div>
    </>
  );
};
export default BigDataCovidCallback;
