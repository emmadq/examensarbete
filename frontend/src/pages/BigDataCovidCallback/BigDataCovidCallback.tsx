import { useEffect, useState } from "react";
import BigDataCovidTableNoCallback from "./BigDataCovidTableNoCallback";
import BigDataCovidTableCallBack from "./BigDataCovidTableCallback";
import StandaloneCallback from "./StandaloneCallback";
import StandalonePlain from "./StandalonePlain";
import { useSearchParams } from "react-router";

interface CovidData {
  state: string;
  positive: number;
  id: number;
}
const BigDataCovidCallback = () => {
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "15px",
          }}
        >
          <button onClick={toggleOrder}>Toggle sorting</button>
        </div>
        <div style={{ margin: "15px", display: "flex", gap: "15px" }}>
          <BigDataCovidTableNoCallback order={order} dataset={dataset} />
          <BigDataCovidTableCallBack order={order} dataset={dataset} />
        </div>
      </>
    );
  else if (version === "standalone") {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            flexDirection: "column",
          }}
        >
          <h3>Callback standalone</h3>

          <button onClick={toggleOrder}>Toggle sorting</button>
        </div>
        <div style={{ margin: "15px", display: "flex", gap: "15px" }}>
          <StandaloneCallback order={order} dataset={dataset} />
        </div>
      </>
    );
  } else
    return (
      <>
        <h3>Plain</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "15px",
          }}
        >
          <button onClick={toggleOrder}>Toggle sorting</button>
        </div>
        <div style={{ margin: "15px", display: "flex", gap: "15px" }}>
          <StandalonePlain order={order} dataset={dataset} />
        </div>
      </>
    );
};

export default BigDataCovidCallback;
