import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";

interface CovidData {
  state: string;
  positive: number;
}
export default function BigDataCovid() {
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
            {dataset.map((item) => (
              <TableRow key={item.state + item.positive}>
                <TableCell>{item.state}</TableCell>
                <TableCell>{item.positive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
