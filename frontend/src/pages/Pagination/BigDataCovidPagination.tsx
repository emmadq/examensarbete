import React, { useEffect, useState } from "react";
import StandalonePlain from "./StandalonePlain";
import Pagination from "./Pagination";

interface CovidData {
  state: string;
  positive: number;
  id: number;
}

export default function BigDataCovidPagination() {
  const [dataset, setDataset] = useState<CovidData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ display: "flex", gap: "14px", alignItems: "start" }}>
      <Pagination
        dataset={dataset}
        page={page}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <StandalonePlain dataset={dataset} />
    </div>
  );
}
