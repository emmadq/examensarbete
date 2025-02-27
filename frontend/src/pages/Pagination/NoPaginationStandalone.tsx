import { useEffect, useState } from "react";
import StandalonePlain from "./StandalonePlain";

interface CovidData {
  state: string;
  positive: number;
  id: number;
}

export default function NoPaginationStandalone() {
  const [dataset, setDataset] = useState<CovidData[]>([]);

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
    <div style={{ display: "flex", gap: "14px" }}>
      <StandalonePlain dataset={dataset} />
    </div>
  );
}
