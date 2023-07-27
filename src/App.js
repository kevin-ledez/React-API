import React from 'react';
import logo from './logo.svg';
import './App.css';
import MovieSearch from './components/MovieSearch';

function App() {
  return (
    <div>
      <h1>Recherche de films par acteur</h1>
      <MovieSearch />
    </div>
  );
}

export default App;
