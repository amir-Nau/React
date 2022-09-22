
import './App.css';
import React, {useEffect, useState} from 'react'
import MovieList from './components/MovieList';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox'
import AddFavorite from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';


// 
function App() {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const[favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) =>{
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=4315414f`
    const response = await fetch(url);
    const responsJson = await response.json()
    if (responsJson.Search){
    setMovies(responsJson.Search)
    }
  }

  useEffect(()=>{
    getMovieRequest(searchValue)
  }, [searchValue])

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

  const addFavourites = (movie) =>{
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList)
    console.log(newFavouriteList)
  }

  const removeFavouriteMovie=(movie)=>{
    const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID)
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }

  return (
        <div className="container-fluid movie-app">
          <div className='row align-items-center mt-4 mb-4'>
            <MovieListHeading heading = 'Movies'/>
            <SearchBox searchValue = {searchValue} setSearchValue = {setSearchValue} />
          </div>
             <div className="d-flex flex-row">
                   <MovieList movies = {movies} handleFavouritesClick = {addFavourites} favouriteComponent = {AddFavorite}/>
             </div>

             <div className='row align-items-center mt-4 mb-4'>
            <MovieListHeading heading = 'Favourites'/>
          </div>

            <div className="d-flex flex-row">
                   <MovieList movies = {favourites} handleFavouritesClick = {removeFavouriteMovie} favouriteComponent = {RemoveFavourites}/>
             </div>
         </div>
  )
}

export default App;
