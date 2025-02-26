import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface CovidData {
  state: string;
  positive: number;
}

const fetchDataset = async () => {
  const response = await fetch(
    "https://api.covidtracking.com/v1/states/daily.json"
  );

  return await response.json();
};

function BigDataCovidQuery() {
  const datasetQuery = useQuery({
    queryKey: ["dataset"],
    queryFn: fetchDataset,
  });
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>State</TableCell>
              <TableCell>Positives</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datasetQuery?.data?.map((item: CovidData) => (
              <TableRow key={item.state + item.positive}>
                <TableCell>{item.state}</TableCell>
                <TableCell>{item.positive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ReactQueryDevtools />
    </>
  );
}
export default BigDataCovidQuery;
