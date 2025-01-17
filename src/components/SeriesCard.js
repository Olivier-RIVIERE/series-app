import React from "react";

const SeriesCard = ({ series }) => {
  const show = series.show || series; 
  const person = series.person || {}; 

  // Titre et image
  const title = show.name || person.name || "Titre indisponible";
  const image = show.image?.medium || person.image?.medium || null;

  // Données pour la série
  const genres = show.genres?.length > 0 ? show.genres.join(", ") : "Non disponible";
  const country = show.network?.country?.name || "Non disponible";
  const summary = show.summary || "Résumé indisponible";
  const network = show.network?.name || "Non disponible";
  const link = show.officialSite || "#";

  // Données pour l'acteur
  const actorName = person.name || "Acteur inconnu";
  const actorImage = person.image?.medium || null;
  const actorBirthday = person.birthday 
  ? new Date(person.birthday).toLocaleDateString('fr-FR') 
  : "Non renseigné";
  const actorCountry = person.country?.name || "Non renseigné";
  const actorShows = person.shows || [];

  return (
    <div className="series-card">
      <h2>{title}</h2>
      {image && <img src={image} alt={title} />}

      {show.name ? (
        <>
          <p><strong>Genres :</strong> {genres}</p>
          <p><strong>Pays d'origine :</strong> {country}</p>
          <p>
            <strong>Résumé :</strong>{" "}
            <span dangerouslySetInnerHTML={{ __html: summary }} />
          </p>
          <p>
            <strong>Chaine :</strong>{" "}
            <a href={link} target="_blank" rel="noreferrer">
              {network}
            </a>
          </p>
        </>
      ) : person.name ? (
        <>
          <p><strong>Nom de l'acteur :</strong> {actorName}</p>
          {/* <img src={actorImage} alt={actorName} /> */}
          <p><strong>Date de naissance :</strong> {actorBirthday}</p>
          <p><strong>Pays d'origine :</strong> {actorCountry}</p>
          <ul>
            {actorShows.map((showUrl, index) => (
              <li key={index}>
                <a href={showUrl} target="_blank" rel="noreferrer">
                  {`Show ${index + 1}`}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Aucune information disponible.</p>
      )}
    </div>
  );
};

export default SeriesCard;






















