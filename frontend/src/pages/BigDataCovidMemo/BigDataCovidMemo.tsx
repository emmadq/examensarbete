import { useEffect, useState } from "react";

import { useSearchParams } from "react-router";
import BigDataCovidTableNoMemo from "./BigDataCovidTableNoMemo";
import BigDataCovidTableMemo from "./BigDataCovidTableMemo";
import StandaloneMemo from "./StandaloneMemo";
import StandalonePlain from "./StandalonePlain";

interface CovidData {
  state: string;
  positive: number;
  id: number;
}
const BigDataCovidMemo = () => {
  const [order, setOrder] = useState<boolean>(false);
  const [dataset, setDataset] = useState<CovidData[]>([]);
  const [searchParams] = useSearchParams();
  const version = searchParams.get("version") || "plain";
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
  if (version === "comparison")
    return (
      <>
        <h3>Comparison</h3>
        <button onClick={toggleOrder}>Toggle sorting</button>
        <div style={{ margin: "15px", display: "flex", gap: "15px" }}>
          <BigDataCovidTableNoMemo order={order} dataset={dataset} />
          <BigDataCovidTableMemo order={order} dataset={dataset} />
        </div>
      </>
    );
  else if (version === "standalone") {
    return (
      <>
        <h3>useMemo standalone</h3>

        <button onClick={toggleOrder}>Toggle sorting</button>
        <div style={{ margin: "15px", display: "flex", gap: "15px" }}>
          <StandaloneMemo order={order} dataset={dataset} />
        </div>
      </>
    );
  } else
    return (
      <>
        <h3>Plain</h3>
        <button onClick={toggleOrder}>Toggle sorting</button>
        <div style={{ margin: "15px", display: "flex", gap: "15px" }}>
          <StandalonePlain order={order} dataset={dataset} />
        </div>
      </>
    );
};
export default BigDataCovidMemo;
