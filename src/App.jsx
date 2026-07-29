import { useEffect, useState } from "react";
import Form from "./components/Form";
import Results from "./components/Results";

const API_URL = "https://api.tvmaze.com";

const App = () => {
  const [results, setResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchLabel, setSearchLabel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenresLoading, setIsGenresLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchGenres = async () => {
      try {
        const response = await fetch(`${API_URL}/shows`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Impossible de charger les genres.");
        }

        const data = await response.json();

        const allGenres = [
          ...new Set(data.flatMap((show) => show.genres || [])),
        ].sort((a, b) => a.localeCompare(b, "fr"));

        setGenres(allGenres);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(
            "Les genres ne sont pas disponibles pour le moment. Vous pouvez tout de même rechercher une série."
          );
        }
      } finally {
        setIsGenresLoading(false);
      }
    };

    fetchGenres();

    return () => controller.abort();
  }, []);

  const fetchResults = async (type, query) => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      return;
    }

    setIsLoading(true);
    setError("");
    setResults([]);
    setSearchLabel("");

    try {
      let nextResults = [];
      let label = "";

      if (type === "name") {
        const response = await fetch(
          `${API_URL}/search/shows?q=${encodeURIComponent(normalizedQuery)}`
        );

        if (!response.ok) {
          throw new Error("La recherche de séries a échoué.");
        }

        nextResults = await response.json();
        label = `Résultats pour « ${normalizedQuery} »`;
      }

      if (type === "genre") {
        const response = await fetch(`${API_URL}/shows`);

        if (!response.ok) {
          throw new Error("La recherche par genre a échoué.");
        }

        const data = await response.json();

        nextResults = data.filter((show) =>
          show.genres?.some(
            (genre) => genre.toLowerCase() === normalizedQuery.toLowerCase()
          )
        );

        label = `Séries du genre ${normalizedQuery}`;
      }

      if (type === "actor") {
        const peopleResponse = await fetch(
          `${API_URL}/search/people?q=${encodeURIComponent(normalizedQuery)}`
        );

        if (!peopleResponse.ok) {
          throw new Error("La recherche d'acteurs a échoué.");
        }

        const people = await peopleResponse.json();
        const matchedPeople = people.slice(0, 3);

        if (matchedPeople.length === 0) {
          nextResults = [];
        } else {
          const creditsByPerson = await Promise.all(
            matchedPeople.map(async ({ person }) => {
              const creditsResponse = await fetch(
                `${API_URL}/people/${person.id}/castcredits?embed=show`
              );

              if (!creditsResponse.ok) {
                return [];
              }

              const credits = await creditsResponse.json();

              return credits
                .map((credit) => ({
                  ...credit._embedded.show,
                  searchedActor: person.name,
                  characterName: credit._links?.character?.name || "",
                }))
                .filter(Boolean);
            })
          );

          const uniqueShows = new Map();

          creditsByPerson.flat().forEach((show) => {
            if (!uniqueShows.has(show.id)) {
              uniqueShows.set(show.id, show);
            }
          });

          nextResults = [...uniqueShows.values()];
        }

        label = `Séries avec « ${normalizedQuery} »`;
      }

      setResults(nextResults);
      setSearchLabel(label);
    } catch (requestError) {
      setError(
        "Une erreur est survenue lors de la récupération des données. Vérifiez votre connexion puis réessayez."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            S
          </span>
          <span>Series App</span>
        </div>

        <p className="eyebrow">Votre prochain coup de cœur commence ici</p>

        <h1>Explorez l’univers des séries.</h1>

        <p className="hero-description">
          Recherchez une série, découvrez sa fiche ou explorez les programmes
          associés à vos acteurs préférés.
        </p>

        <Form
          onSearch={fetchResults}
          genres={genres}
          isLoading={isLoading}
          isGenresLoading={isGenresLoading}
        />
      </section>

      <section className="catalog" aria-live="polite">
        {error && (
          <div className="feedback feedback-error" role="alert">
            <span aria-hidden="true">!</span>
            <p>{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="feedback feedback-loading">
            <span className="loader" aria-hidden="true" />
            <p>Recherche en cours dans le catalogue…</p>
          </div>
        )}

        {!isLoading && !error && (
          <Results data={results} searchLabel={searchLabel} />
        )}
      </section>
    </main>
  );
};

export default App;