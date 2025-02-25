import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

interface CovidData {
  state: string;
  positive: number;
  id: number;
}
interface standaloneProps {
  dataset: CovidData[];
}

const StandalonePlain = ({ dataset }: standaloneProps) => {
  console.log("RE-RENDER");

  return (
    <>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>State</TableCell>
              <TableCell>Positives</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataset.map((item, index: number) => (
              <TableRow key={index}>
                <TableCell>{item.state}</TableCell>
                <TableCell>{item.positive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};
export default StandalonePlain;
