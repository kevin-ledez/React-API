import React, { useState } from "react";

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const API_KEY = "005b56149e8ba5468ce2c4974c5d4cb9";
  const BASE_URL = "https://api.themoviedb.org/3";

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Recherche des films associés à l'acteur
      const actorResponse = await fetch(
        `${BASE_URL}/search/person?api_key=${API_KEY}&query=${searchQuery}`
      );
      const actorData = await actorResponse.json();
      const actorId = actorData.results[0]?.id || null;

      // Recherche des films avec le mot clé dans le titre
      const movieResponse = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`
      );
      const movieData = await movieResponse.json();

      // Combinaison des résultats des deux recherches
      const actorMovies = actorId ? await getMoviesForActor(actorId) : [];
      const combinedResults = [...movieData.results, ...actorMovies];
      setResults(combinedResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fonction pour obtenir les films associés à un acteur
  const getMoviesForActor = async (actorId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/person/${actorId}/movie_credits?api_key=${API_KEY}`
      );
      const data = await response.json();
      return data.cast || [];
    } catch (error) {
      console.error("Error fetching actor movies:", error);
      return [];
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un acteur ou un mot clé dans le titre"
        />
        <button type="submit">Rechercher</button>
      </form>
      <ul>
        {results && results.length > 0 ? (
          results.map((result) => (
            <li key={result.id}>
              <p>Titre : {result.title}</p>
            </li>
          ))
        ) : (
          <li>Aucun résultat trouvé.</li>
        )}
      </ul>
    </div>
  );
};

export default MovieSearch;
