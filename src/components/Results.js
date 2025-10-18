import React, { useState, useEffect } from "react";
import SeriesCard from "./SeriesCard";

const Results = ({ data }) => {
  // Etat pour la page 1
  const [currentPage, setCurrentPage] = useState(1);

  // Nombre d'éléments par page
  const itemsPerPage = 12;

  //  Calculer le nombre de pages nécessaires
  //  Math.ceil() pour arrondir au superieur le nombre de pages (ex: 25 résultats / 12 éléments par page = 3 pages)
  const totalPages = Math.ceil(data.length / itemsPerPage);

  //  Calculer l'index de début et de fin pour slicer les données
  //  Si on est à la page 2 : début = (2-1) * 12 = 12
  const startIndex = (currentPage - 1) * itemsPerPage;
  //  Fin = 12 + 12 = 24
  const endIndex = startIndex + itemsPerPage;

  // Extraire les éléments pour la page actuelle
  // slice(12, 24) va prendre les éléments de 12 à 23
  const currentData = data.slice(startIndex, endIndex);

  // Réinitialiser la page quand les données changent
  useEffect(() => {
      setCurrentPage(1);
  }, [data]);

  // Fonction pour aller à la page précédente
  //  On vérifie si la page actuelle est plus grande que 1
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Scroll vers le haut de la page
    }
  };

  // Fonction pour aller à la page suivante
  //  On vérifie si la page actuelle est plus petite que le nombre de pages
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <div className="results">
        {currentData.length > 0 ? (
          // On map sur currentData (les 12 éléments) au lieu de data complet
          currentData.map((item, index) => (
            <SeriesCard key={startIndex + index} series={item} />
          ))
        ) : (
          <p>Aucun résultat trouvé.</p>
        )}
      </div>

      {/*  Afficher la pagination que si le nombre de pages est plus grand que 1 */}
      {totalPages > 1 && (
        <div className="pagination">
          {/* Bouton Précédent - désactivé si on est à la page 1 */}
          <button onClick={goToPreviousPage} disabled={currentPage === 1} className="pagination-btn">
            ← Précédent
          </button>

          {/* Afficher le numérto de page actuelle */}
          <span className="pagination-info">Page {currentPage} sur {totalPages}</span>

          {/* Bouton Suivant - désactivé si on est à la dernière page */}
          <button onClick={goToNextPage} disabled={currentPage === totalPages} className="pagination-btn">
            Suivant →
          </button>
        </div>
      )}
    </>
  );
};

export default Results;






