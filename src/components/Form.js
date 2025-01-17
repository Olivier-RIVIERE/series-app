import React, { useState } from "react";

const Form = ({ onSearch, genres }) => {
  const [search, setSearch] = useState("name");
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() || search === "genre") {
      onSearch(search, query);
    }
  };

  const renderInput = () => {
    if (search === "genre") {
      return (
        <select value={query} onChange={(e) => setQuery(e.target.value)}>
          <option value="">Sélectionnez un genre</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      );
    } else {
      return (
        <input
          type="text"
          placeholder={
            search === "name" ? "Nom de la série..." : "Nom de l'acteur..."
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      );
    }
  };


  return (
    <div className="form">
      <form onSubmit={handleSearch}>
        <label>
          <select value={search} onChange={(e) => setSearch(e.target.value)}>
            <option value="name">Nom de la série</option>
            <option value="genre">Genre</option>
            <option value="actor">Acteur</option>
          </select>
        </label>
        {renderInput()}
        <button type="submit">Rechercher</button>
      </form>
    </div>
  );
};

export default Form;







