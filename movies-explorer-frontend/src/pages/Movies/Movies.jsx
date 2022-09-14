import Layout from '../../components/Layout/Layout';
import React, { Suspense } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import Preloader from '../../components/Preloader/Preloader';

import styles from './Movies.scss';

function Movies({
  movies,
  loggedIn,
  openPopup,
  setMovies,
  setFetchMoviesError,
  setMoviesToShow,
  ...restProps
}) {
  const MoviesCardList = React.lazy(() => import('../../components/MoviesCardList/MoviesCardList'));

  return (
      <Layout loggedIn={loggedIn} openPopup={openPopup}>
        <div className="movies__container">
          <SearchForm
            movies={movies}
            setMoviesToShow={setMoviesToShow}
            setMovies={setMovies}
            setFetchMoviesError={setFetchMoviesError}
          ></SearchForm>
            <Suspense fallback={<Preloader />}>
              {<MoviesCardList movies={movies} setMoviesToShow={setMoviesToShow} {...restProps} />}
            </Suspense>
        </div>
      </Layout>
    
  );
}

export default Movies;
