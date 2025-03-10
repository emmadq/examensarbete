import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./QueryReactMemo.css"; // Import the CSS

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

  if (!datasetQuery.isFetched) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className="table-wrapper"
        style={{
          display: "flex",
          gap: "5px",
          border: "white 1px solid",
          padding: "10px",
          borderRadius: "15px",
        }}
      >
        <div className="table-container">
          <h3>With useQuery</h3>
          <table className="covid-table">
            <thead>
              <tr>
                <th>State</th>
                <th>Positives</th>
              </tr>
            </thead>
            <tbody>
              {datasetQuery?.data?.map((item: CovidData) => (
                <tr key={item.state + item.positive}>
                  <td>{item.state}</td>
                  <td>{item.positive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ReactQueryDevtools />
    </>
  );
}

export default BigDataCovidQuery;
