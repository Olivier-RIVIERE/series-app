import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Results from "./components/Results";

const App = () => {
  const [results, setResults] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("https://api.tvmaze.com/shows");
        const data = await response.json();
        const allGenres = [...new Set(data.flatMap((show) => show.genres))];
        setGenres(allGenres);
      } catch (error) {
        console.error("Erreur lors de la récupération des genres :", error);
      }
    };

    fetchGenres();
  }, []);

  const fetchResults = async (type, query) => {
    let url = "";

    if (type === "name") {
      url = `https://api.tvmaze.com/search/shows?q=${query}`;
    } else if (type === "actor") {
      url = `https://api.tvmaze.com/search/people?q=${query}`;
    } else if (type === "genre") {
      url = `https://api.tvmaze.com/shows`; // Placeholder pour récupérer les séries
    }

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (type === "genre") {
        // Filtrer les séries par genre
        const filtered = data.filter((show) => show.genres.includes(query));
        setResults(filtered);
      } else if (type === "actor") {
        // Pour les acteurs, on prépare les données avec leurs émissions
        const actorsData = data.map((actor) => ({
          person: actor.person,
          shows: actor._embedded?.castcredits || []
        }));
        setResults(actorsData);
      } else {
        setResults(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  return (
    <div className="App">
      <h1>Les séries TV</h1>
      <Form onSearch={fetchResults} genres={genres} />
      <Results data={results} />
      
    </div>
  );
};

export default App;

