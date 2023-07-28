import React, { useState } from "react";
import "./MovieSearch.css";
import logo from "./images/logo-spot.png";

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const API_KEY = "005b56149e8ba5468ce2c4974c5d4cb9";
  const BASE_URL = "https://api.themoviedb.org/3";

  const handleSearch = async (query) => {
    try {
      // Recherche des films associés à l'acteur
      const actorResponse = await fetch(
        `${BASE_URL}/search/person?api_key=${API_KEY}&query=${query}`
      );
      const actorData = await actorResponse.json();
      const actorId = actorData.results[0]?.id || null;

      // Recherche des films avec le mot clé dans le titre
      const movieResponse = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
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

  const handleChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Appeler handleSearch pour effectuer la recherche automatiquement
    handleSearch(query);
  };

  return (
    <div className="container">
      <img src={logo} alt="logo" width={300} height={110} className="logo" />
      <div className="search">
        <input className="search-input" type="text" value={searchQuery} onChange={handleChange} placeholder="Rechercher un acteur, un film ou un mot clé dans le titre"
        />
        <ul>
          {results && results.length > 0
            ? results.map(
                (result) => (
                  console.log(result),
                  (
                    <li key={result.id}>
                      <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} width={130} alt="poster" />
                      <p>Titre : {result.title}</p>
                      <p>Date de sortie : {result.release_date}</p>
                    </li>
                  )
                )
              )
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default MovieSearch;
