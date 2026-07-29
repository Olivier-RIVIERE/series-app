import { useEffect, useMemo, useState } from "react";
import SeriesCard from "./SeriesCard";

const ITEMS_PER_PAGE = 12;

const Results = ({ data, searchLabel }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, data]);

  const changePage = (nextPage) => {
    setCurrentPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!searchLabel) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">
          ▷
        </span>
        <h2>Le catalogue vous attend</h2>
        <p>
          Lancez une recherche par titre, acteur ou genre pour découvrir des
          séries.
        </p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon" aria-hidden="true">
          ◌
        </span>
        <h2>Aucun résultat trouvé</h2>
        <p>
          Essayez une autre orthographe, un titre plus court ou un autre genre.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="results-heading">
        <div>
          <p className="eyebrow">Catalogue</p>
          <h2>{searchLabel}</h2>
        </div>
        <span className="results-count">
          {data.length} résultat{data.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="results">
        {currentData.map((item) => (
          <SeriesCard key={item.show?.id || item.id} series={item} />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="pagination" aria-label="Pagination des résultats">
          <button
            className="pagination-btn"
            type="button"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Précédent
          </button>

          <span className="pagination-info">
            Page {currentPage} sur {totalPages}
          </span>

          <button
            className="pagination-btn"
            type="button"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant →
          </button>
        </nav>
      )}
    </>
  );
};

export default Results;