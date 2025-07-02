import { useEffect, useState } from 'react'
import './App.css'
import searchIcon from './search.svg'
import MovieCard from './MovieCard';


// 64bb893c

const  API_URL ='https://www.omdbapi.com/?apikey=64bb893c';
const movies ={
        "Title": "Batman Begins",
        "Year": "2005",
        "imdbID": "tt0372784",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BODIyMDdhNTgtNDlmOC00MjUxLWE2NDItODA5MTdkNzY3ZTdhXkEyXkFqcGc@._V1_SX300.jpg"
    }

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Batman");

  const searchMovie = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search || []);
  };

  useEffect(() => {
    searchMovie("Batman");
  }, []);

  return (
    <>
   <div className='app'>
    <h1>MovieSpace</h1>
    <div className='search'>
      <input
        placeholder='search for movie'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <img
        src={searchIcon}
        alt="search"
        onClick={() => searchMovie(searchTerm)}
      />
    </div>

    {movies?.length > 0 ? (
      <div className='container'>
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    ) : (
      <div className='empty'>
        <h2>No movies found</h2>
      </div>
    )}
    
   

   </div>
   </>
  )
}

export default App
