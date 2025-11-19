import React, { use, useEffect, useState } from 'react'
import Search from './components/Search'
import toast from 'react-hot-toast';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import { getTrendingMovies, UpdateSearchCount } from './appwrite';

const API_BASE_URL = "https://api.themoviedb.org/3" 
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API_KEY}`
  }

}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {
    setIsLoading(true)
    try{
      const endPoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endPoint, API_OPTIONS)

      if(!response){
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json()

      if(data.response === "False"){
        toast.error(data.error || "Falied to fetch movies");
        setMovieList([]);
        return;
      }

      setMovieList(data.results || [])

      if (query && data.results.length > 0) {
        await UpdateSearchCount(query, data.results[0]);
      }


    }catch(error) {
      console.log(`Error fetching movies ${error}`)
      toast.error("Error fetching movies! Please try again later")

    }finally{
      setIsLoading(false)
    }
  }

  const loadTrendingMovies = async () => {
    try{
      const movies = await getTrendingMovies()

      setTrendingMovies(movies)

    }catch(error){
      console.log(`Error fetching trending moveis: ${error}`)
    }
  }



  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  useEffect(() => {
    loadTrendingMovies()

  }, [])

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="hero-image" />
          <h1>Find <span className="text-gradient">Movies</span> You Will Enjoy</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{ index + 1 }</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2>All Movies</h2>

          {isLoading ? (
            <p className='text-white'>Loading...</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} /> 

              ))}
            </ul>
          )  }
        </section>
        
        
      </div>
    </main>
  )
}

export default App
