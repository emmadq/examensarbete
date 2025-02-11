import React, { useEffect, useState } from "react";
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

const stateAbbreviations: { [key: string]: string } = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
  GU: "Guam",
  MP: "Northern Mariana Islands",
  PR: "Puerto Rico",
  VI: "Virgin Islands",
  DC: "Washington DC",
  AS: "American Samoa",
};

export default function BigDataCovidPagination() {
  const [dataset, setDataset] = useState<CovidData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openState, setOpenState] = useState<string | null>(null);

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

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const groupedData = dataset.reduce(
    (acc: { [key: string]: CovidData[] }, item) => {
      if (!acc[item.state]) {
        acc[item.state] = [];
      }
      acc[item.state].push(item);
      return acc;
    },
    {}
  );

  const allStates = Object.keys(groupedData);
  const pagedStates = allStates.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const handleStateToggle = (state: string) => {
    setOpenState(openState === state ? null : state);
  };

  return (
    <>
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
        rowsPerPageOptions={[10, 25]}
        component="div"
        count={allStates.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
