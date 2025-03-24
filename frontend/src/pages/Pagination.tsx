import "./Pagination.css";
interface CovidData {
  state: string;
  positive: number;
  id: number;
}

interface PaginationProps {
  dataset: CovidData[];
  page: number;
  rowsPerPage: number;
  handlePageChange: (newPage: number) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  dataset,
  page,
  rowsPerPage,
  handlePageChange,
  handleChangeRowsPerPage,
}) => {
  const pagedData = dataset.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <div className="table-container">
      <table className="table">
        {/* <thead>
          <tr className="table-header">
            <th className="table-cell">State</th>
            <th className="table-cell">Positives</th>
          </tr>
        </thead> */}
        <tbody>
          {pagedData.map((item, index) => (
            <tr key={index} className="table-row">
              <td className="table-cell">{item.state}</td>
              <td className="table-cell">{item.positive}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
          disabled={(page + 1) * rowsPerPage >= dataset.length}
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
