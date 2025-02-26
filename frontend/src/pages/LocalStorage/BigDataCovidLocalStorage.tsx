import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

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

function BigDataFaker() {
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
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((item: UserData, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.firstName}</TableCell>
                  <TableCell>{item.email}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 50, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ReactQueryDevtools />
    </>
  );
}

export default BigDataFaker;
