import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./ReactQueryWithLocalStorage.css";

interface UserData {
  id: number;
  firstName: string;
  email: string;
}

const fetchDataset = async () => {
  const startTime = performance.now();

  const response = await fetch("https://dummyjson.com/users");
  const data = await response.json();

  const endTime = performance.now();
  console.log(`API Fetch Time: ${(endTime - startTime).toFixed(2)}ms`);

  return data.users;
};

function ReactQueryWithLocalStorage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const datasetQuery = useQuery({
    queryKey: ["userdata"],
    queryFn: fetchDataset,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60 * 24,
  });

  // logging when data is loaded from cache
  useEffect(() => {
    if (datasetQuery.isFetching) {
      console.log("Fetching new data from Api...");
    } else if (datasetQuery.dataUpdatedAt) {
      const restoreStart = performance.now();
      console.log(`Data restored from cache`);
      const restoreEnd = performance.now();
      console.log(
        `LocalStorage Load Time: ${(restoreEnd - restoreStart).toFixed(2)}ms`
      );
    }
  });

  const data = datasetQuery?.data ?? [];

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr className="table-header">
            <th className="table-cell">First Name</th>
            <th className="table-cell">Email</th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((item: UserData, index: number) => (
              <tr key={index} className="table-row">
                <td className="table-cell">{item.firstName}</td>
                <td className="table-cell">{item.email}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handleChangePage(undefined, page - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {Math.ceil(data.length / rowsPerPage)}
        </span>
        <button
          onClick={() => handleChangePage(undefined, page + 1)}
          disabled={page === Math.ceil(data.length / rowsPerPage) - 1}
        >
          Next
        </button>
      </div>

      <div className="rows-per-page">
        <label>Rows per page: </label>
        <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
          <option value={10}>10</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
}

export default ReactQueryWithLocalStorage;
