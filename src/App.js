import React, { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';


const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=a1a8f730';

// const movie1 = {
//     "Title": "Amazing Spiderman Syndrome",
//     "Year": "2012",
//     "imdbID": "tt2586634",
//     "Type": "movie",
//     "Poster": "N/A"
// }

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
 
    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        // const data = response.json();
        // data.then((res) => {
        //     setMovies(res.Search);
        // });
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies("love");
    }, []);

  return (
    <div className='app'>
        <h1>MovieLand</h1>

        <div className='search'>
            <input
                placeholder='Search for movies'
                value={searchTerm}
                onChange={(e) => {setSearchTerm(e.target.value)}}
                onKeyDown={ (e) => (
                    e.key === 'Enter' ? searchMovies(searchTerm) : null
                )}
            />

            <img 
                src={SearchIcon}
                alt="search"
                onClick={() => {searchMovies(searchTerm)}}
            />
        </div>

        {movies?.length > 0
        ? (
            <div className='container'>
                {movies.map((movie) => (<MovieCard movie = {movie}/>))}
            </div>
        ) : (
            <div className='empty'>
                <h2>No movies found</h2>
            </div>

        )}
    </div>
  );
}

export default App;