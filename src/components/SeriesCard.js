import { useState } from "react";

const PLACEHOLDER_IMAGE =
  "https://placehold.co/420x600/182035/e8edff?text=Series%0AExplorer";

const removeHtmlTags = (value) => {
  if (!value) {
    return "Aucun résumé n’est disponible pour cette série.";
  }

  return value.replace(/<[^>]*>/g, "").trim();
};

const getYear = (date) => {
  if (!date) {
    return "—";
  }

  return new Date(date).getFullYear();
};

const SeriesCard = ({ series }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const show = series.show || series;
  const {
    name,
    image,
    genres = [],
    rating,
    status,
    premiered,
    ended,
    summary,
    network,
    webChannel,
    officialSite,
    language,
    type,
    searchedActor,
    characterName,
  } = show;

  const provider = network?.name || webChannel?.name || "Non renseigné";
  const country = network?.country?.name || "International";
  const score = rating?.average ? rating.average.toFixed(1) : "N/A";
  const years = ended
    ? `${getYear(premiered)} — ${getYear(ended)}`
    : `${getYear(premiered)} — aujourd’hui`;

  return (
    <article className="series-card">
      <div className="poster-wrapper">
        <img
          className="series-poster"
          src={image?.medium || PLACEHOLDER_IMAGE}
          alt={`Affiche de ${name}`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = PLACEHOLDER_IMAGE;
          }}
        />

        <span className={`status-badge status-${status?.toLowerCase() || "unknown"}`}>
          {status || "Inconnu"}
        </span>

        <span className="rating-badge" title="Note TVMaze">
          ★ {score}
        </span>
      </div>

      <div className="series-content">
        <p className="series-meta">
          {type || "Série"} · {years}
        </p>

        <h3>{name || "Titre indisponible"}</h3>

        {searchedActor && (
          <p className="actor-highlight">
            Avec {searchedActor}
            {characterName ? ` · ${characterName}` : ""}
          </p>
        )}

        <div className="genres-list">
          {genres.length > 0 ? (
            genres.slice(0, 3).map((genre) => (
              <span className="genre-badge" key={genre}>
                {genre}
              </span>
            ))
          ) : (
            <span className="genre-badge">Genre inconnu</span>
          )}
        </div>

        <button
          className="details-button"
          type="button"
          onClick={() => setIsExpanded((currentValue) => !currentValue)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Masquer les détails" : "Voir les détails"}
          <span aria-hidden="true">{isExpanded ? "↑" : "↓"}</span>
        </button>

        {isExpanded && (
          <div className="series-details">
            <p>{removeHtmlTags(summary)}</p>

            <dl className="series-facts">
              <div>
                <dt>Diffusion</dt>
                <dd>{provider}</dd>
              </div>
              <div>
                <dt>Pays</dt>
                <dd>{country}</dd>
              </div>
              <div>
                <dt>Langue</dt>
                <dd>{language || "Non renseignée"}</dd>
              </div>
            </dl>

            {officialSite && (
              <a
                className="official-link"
                href={officialSite}
                target="_blank"
                rel="noreferrer"
              >
                Site officiel <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default SeriesCard;