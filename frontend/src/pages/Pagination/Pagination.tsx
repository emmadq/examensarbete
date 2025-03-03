import React, { useState } from "react";
import "./Pagination.css"; // Import the CSS file

interface CovidData {
  state: string;
  positive: number;
}

interface PaginationProps {
  groupedData: { [key: string]: CovidData[] };
  allStates: string[];
  page: number;
  rowsPerPage: number;
  handlePageChange: (newPage: number) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
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
    <div className="pagination-container">
      <div className="list-container">
        {pagedStates.map((state) => (
          <div key={state} className="state-item">
            <button
              className="toggle-button"
              onClick={() => handleStateToggle(state)}
            >
              <span className="state-name">
                {stateAbbreviations[state] || state}
              </span>
              <span className="toggle-icon">
                {openState === state ? "-" : "+"}
              </span>
            </button>
            {openState === state && (
              <ul className="state-details">
                {groupedData[state].map((item, index) => (
                  <li key={state + item.positive + index}>
                    <strong>Positives:</strong> {item.positive}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button
          className="page-button"
          disabled={page === 0}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>
        <span className="page-info">Page {page + 1}</span>
        <button
          className="page-button"
          disabled={(page + 1) * rowsPerPage >= allStates.length}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
        <select
          className="rows-select"
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
        >
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
