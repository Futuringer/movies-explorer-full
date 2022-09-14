import { useEffect } from 'react';

import api from '../../utils/api/MainApi';
import Layout from '../../components/Layout/Layout';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import styles from './SavedMovies.scss';

function SavedMovies({
  loggedIn,
  openPopup,
  setSavedMovies,
  moviesToShow,
  movies,
  setMoviesToShow,
  setFetchMoviesError,
  ...restProps
}) {
  useEffect(() => {
    api.getMovies().then((res) => {
      setSavedMovies(res.data);
    });
  }, []);

  return (
    <Layout loggedIn={loggedIn} openPopup={openPopup}>
      <div className="movies__container">
        <SearchForm
          isSavedMovies
          movies={movies}
          setSavedMovies={setSavedMovies}
          setMoviesToShow={setMoviesToShow}
          setFetchMoviesError={setFetchMoviesError}
        ></SearchForm>
        <MoviesCardList
          isSavedMovies
          setSavedMovies={setSavedMovies}
          moviesToShow={moviesToShow}
          setMoviesToShow={setMoviesToShow}
          {...restProps}
        ></MoviesCardList>
      </div>
    </Layout>
  );
}

export default SavedMovies;
