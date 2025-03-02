import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

interface CovidData {
  state: string;
  positive: number;
  id: number;
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
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

  return (
    <div style={{ display: "flex", gap: "14px" }}>
      <Pagination
        groupedData={groupedData}
        allStates={allStates}
        page={page}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        stateAbbreviations={stateAbbreviations}
      />
    </div>
  );
}
