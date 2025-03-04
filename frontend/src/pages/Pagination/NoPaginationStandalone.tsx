import { useEffect, useState } from "react";
import StandalonePlain from "./StandalonePlain";

interface CovidData {
  state: string;
  positive: number;
  id: number;
}

export default function NoPaginationStandalone() {
  const [dataset, setDataset] = useState<CovidData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.covidtracking.com/v1/states/daily.json"
      );
      const data: CovidData[] = await response.json();
      setDataset(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{dataset.length > 0 && <StandalonePlain dataset={dataset} />}</>;
}
