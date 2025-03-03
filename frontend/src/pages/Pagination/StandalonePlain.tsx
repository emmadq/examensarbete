import "./StandalonePlain.css";

interface CovidData {
  state: string;
  positive: number;
  id: number;
}

interface StandaloneProps {
  dataset: CovidData[];
}

const StandalonePlain = ({ dataset }: StandaloneProps) => {
  console.log("RE-RENDER");

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr className="table-header">
            <th className="table-cell">State</th>
            <th className="table-cell">Positives</th>
          </tr>
        </thead>
        <tbody>
          {dataset.map((item, index) => (
            <tr key={index} className="table-row">
              <td className="table-cell">{item.state}</td>
              <td className="table-cell">{item.positive}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StandalonePlain;
