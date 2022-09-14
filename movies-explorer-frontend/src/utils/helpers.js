import { SHORT_MOVIES_DURATION } from "./constants";

export const durationParser = (minutes) => {
  return `${Math.floor(minutes / 60)}ч ${minutes % 60}м`;
};

export const moviesFilterer = (movies, search, shortFilms) => {
  const filteredMovies = [];
  movies.forEach((movie) => {
    const allTextFieldsArray = `${movie.country} ${movie.description} ${movie.director} ${movie.nameEN} ${movie.nameRU}`.toLowerCase();
    if (allTextFieldsArray.includes(search.toLowerCase())) {
      if ((shortFilms && movie.duration > SHORT_MOVIES_DURATION) || !shortFilms) {
        filteredMovies.push(movie);
      }
    }
  });

  return filteredMovies;
};

export const checkIfSaved = (movie, savedMovies) => {
  if (savedMovies?.length)
  return (movie.isSaved = savedMovies?.some((savedMovie) => savedMovie.movieId === movie.id));
};

export const getMovieId = (innerId, savedMovies) => {
  const movie = savedMovies.find((movie) => movie.movieId === innerId);
  return movie._id;
}

