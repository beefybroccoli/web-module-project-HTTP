import React, { useEffect, useState, Provider } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from "./components/MovieList";
import Movie from "./components/Movie";
import MovieHeader from "./components/MovieHeader";
import EditMovieForm from "./components/EditMovieForm";
import FavoriteMovieList from "./components/FavoriteMovieList";
import axios from "axios";
import { API_URL_MOVIES } from "./constant/constant";
import ContextObject from "./context/context";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL_MOVIES)
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("App.js - changes in movies, movies = ", movies);
  }, [movies]);
  const replaceMovie = (newMovie) => {
    console.log("app.js, new movie = ", newMovie);
    const temp_movies = movies.map((each) => {
      if (each.id === JSON.stringify(newMovie.id)) {
        return newMovie;
      } else {
        return each;
      }
    });
    setMovies(temp_movies);
  };

  const deleteMovie = (id) => {};

  const addToFavorites = (movie) => {};

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand">
          <img width="40px" alt="" src="./Lambda-Logo-Red.png" /> HTTP / CRUD
          Module Project
        </span>
      </nav>

      <div className="container">
        <ContextObject.Provider
          value={{
            movies,
            setMovies,
            favoriteMovies,
            setFavoriteMovies,
            replaceMovie,
            deleteMovie,
            addToFavorites,
          }}
        >
          <MovieHeader />
          <div className="row ">
            <FavoriteMovieList favoriteMovies={favoriteMovies} />

            <Switch>
              <Route path="/movies/edit/:id">
                <EditMovieForm />
              </Route>

              <Route path="/movies/:id">
                <Movie />
              </Route>

              <Route path="/movies">
                <MovieList movies={movies} />
              </Route>

              <Route path="/">
                <Redirect to="/movies" />
              </Route>
            </Switch>
          </div>
        </ContextObject.Provider>
      </div>
    </div>
  );
};

export default App;

/*

*/
