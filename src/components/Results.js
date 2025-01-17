import React from "react";
import SeriesCard from "./SeriesCard";

const Results = ({ data }) => {
  return (
    <div className="results">
      {data.length > 0 ? (
        data.map((item, index) => <SeriesCard key={index} series={item} />)
      ) : (
        <p>Aucun résultat trouvé.</p>
      )}
    </div>
  );
};

export default Results;






