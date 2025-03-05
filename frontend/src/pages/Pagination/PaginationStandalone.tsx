import { useEffect, useState } from "react";
import Pagination from "./Pagination";

interface CovidData {
  state: string;
  positive: number;
  id: number;
}

export default function PaginationStandalone() {
  const [dataset, setDataset] = useState<CovidData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

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

  if (dataset.length === 0) {
    return <div>Loading...</div>;
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {dataset.length > 0 && (
        <Pagination
          dataset={dataset}
          page={page}
          rowsPerPage={rowsPerPage}
          handlePageChange={handlePageChange}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </>
  );
}
