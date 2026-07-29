import { useEffect, useState } from "react";

const searchOptions = {
  name: {
    label: "Série",
    placeholder: "Ex. Stranger Things",
    buttonText: "Rechercher une série",
  },
  actor: {
    label: "Acteur / actrice",
    placeholder: "Ex. Pedro Pascal",
    buttonText: "Rechercher un acteur",
  },
  genre: {
    label: "Genre",
    placeholder: "",
    buttonText: "Explorer ce genre",
  },
};

const Form = ({ onSearch, genres, isLoading, isGenresLoading }) => {
  const [searchType, setSearchType] = useState("name");
  const [query, setQuery] = useState("");

  const currentOption = searchOptions[searchType];
  const canSubmit = Boolean(query.trim()) && !isLoading;

  useEffect(() => {
    setQuery("");
  }, [searchType]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (canSubmit) {
      onSearch(searchType, query);
    }
  };

  return (
    <form className="search-panel" onSubmit={handleSubmit}>
      <div className="search-tabs" role="group" aria-label="Type de recherche">
        {Object.entries(searchOptions).map(([value, option]) => (
          <button
            className={`search-tab ${searchType === value ? "is-active" : ""}`}
            key={value}
            type="button"
            onClick={() => setSearchType(value)}
            aria-pressed={searchType === value}
          >
            {option.label}
          </button>
        ))}
      </div>

      <label className="sr-only" htmlFor="series-search">
        {currentOption.label}
      </label>

      <div className="search-row">
        <div className="search-field">
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>

          {searchType === "genre" ? (
            <select
              id="series-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              disabled={isGenresLoading}
            >
              <option value="">
                {isGenresLoading
                  ? "Chargement des genres…"
                  : "Choisissez un genre"}
              </option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          ) : (
            <input
              id="series-search"
              type="search"
              value={query}
              placeholder={currentOption.placeholder}
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
            />
          )}
        </div>

        <button
          className="search-submit"
          type="submit"
          disabled={!canSubmit}
        >
          {isLoading ? "Recherche…" : currentOption.buttonText}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
};

export default Form;