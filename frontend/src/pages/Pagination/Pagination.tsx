import React, { useState } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemButton,
  TablePagination,
} from "@mui/material";

interface CovidData {
  state: string;
  positive: number;
}

interface PaginationProps {
  groupedData: { [key: string]: CovidData[] };
  allStates: string[];
  page: number;
  rowsPerPage: number;
  handlePageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  stateAbbreviations: { [key: string]: string };
}

const Pagination: React.FC<PaginationProps> = ({
  groupedData,
  allStates,
  page,
  rowsPerPage,
  handlePageChange,
  handleChangeRowsPerPage,
  stateAbbreviations,
}) => {
  const [openState, setOpenState] = useState<string | null>(null);

  const handleStateToggle = (state: string) => {
    setOpenState(openState === state ? null : state);
  };

  const pagedStates = allStates.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <div>
      <Paper>
        <List>
          {pagedStates.map((state) => (
            <div key={state}>
              <ListItemButton onClick={() => handleStateToggle(state)}>
                <ListItemText primary={stateAbbreviations[state] || state} />
              </ListItemButton>
              <Collapse in={openState === state} timeout="auto" unmountOnExit>
                <List>
                  {groupedData[state].map((item, index) => (
                    <ListItem key={state + item.positive + index}>
                      <ListItemText primary={`Positives: ${item.positive}`} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}
        </List>
      </Paper>
      <TablePagination
        sx={{
          "& .MuiTablePagination-select, & .MuiTablePagination-input, & .MuiTablePagination-toolbar":
            {
              color: "white",
            },
        }}
        rowsPerPageOptions={[25, 50]}
        component="div"
        count={allStates.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Pagination;
