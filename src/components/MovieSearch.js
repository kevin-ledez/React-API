import React, { useState } from "react";

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const API_KEY = "005b56149e8ba5468ce2c4974c5d4cb9";
  const BASE_URL = "https://api.themoviedb.org/3/search/person";

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${BASE_URL}?api_key=${API_KEY}&query=${searchQuery}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        // Assuming the first result is the closest match for the actor
        const actorId = data.results[0].id;
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}`
        );
        const movieData = await movieResponse.json();
        setMovies(movieData.cast);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Entrez le nom de l'acteur"
        />
        <button type="submit">Rechercher</button>
      </form>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
