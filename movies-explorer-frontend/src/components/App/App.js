import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { LINKS } from '../../utils/constants';
import api from '../../utils/api/MainApi';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../../pages/Main/Main';
import Movies from '../../pages/Movies/Movies';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';
import Register from '../../pages/Register/Register';
import Login from '../../pages/Login/Login';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';
import NavigationPopup from '../NavigationPopup/NavigationPopup';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import styles from './App.css';

function App() {
  const navigate = useNavigate();
  const [menuPopupIsOpen, setMenuPopupIsOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [fetchMoviesError, setFetchMoviesError] = useState(false);
  const [actualUser, setActualUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  const handleCloseMenuPopup = () => {
    setMenuPopupIsOpen(false);
  };

  const handleOpenMenuPopup = () => {
    setMenuPopupIsOpen(true);
  };

  const handleLogout = () => {
    navigate(LINKS.MAIN);
    localStorage.clear();
    setLoggedIn(false);
    localStorage.setItem('loggedIn', JSON.stringify(false));
    api.logout().catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    api
      .getMyInfo()
      .then((res) => {
        setActualUser(res);
        setLoggedIn(true);
        localStorage.setItem('loggedIn', JSON.stringify(true));
      })
      .catch((err) => {});

    const movies = JSON.parse(localStorage.getItem('movies'));
    const moviesToShow = JSON.parse(localStorage.getItem('moviesToShow'));
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    if (movies?.length) {
      setMovies(movies);
      setMoviesToShow(moviesToShow);
      setSavedMovies(savedMovies);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={actualUser}>
      <Routes>
        <Route
          exact
          path={'*'}
          element={<NotFound loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        ></Route>
        <Route
          exact
          path={LINKS.MAIN}
          element={<Main openPopup={handleOpenMenuPopup} loggedIn={loggedIn} />}
        ></Route>

        <Route path={LINKS.MOVIES} element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route
            path={LINKS.MOVIES}
            element={
              <Movies
                loggedIn={loggedIn}
                movies={movies}
                openPopup={handleOpenMenuPopup}
                setMovies={setMovies} //все фильмы несортированные
                moviesToShow={moviesToShow}
                setMoviesToShow={setMoviesToShow}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                fetchMoviesError={fetchMoviesError}
                setFetchMoviesError={setFetchMoviesError}
              />
            }
          ></Route>
        </Route>

        <Route path={LINKS.SAVED_MOVIES} element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route
            path={LINKS.SAVED_MOVIES}
            element={
              <SavedMovies
                loggedIn={loggedIn}
                movies={savedMovies}
                moviesToShow={moviesToShow}
                isSaved
                openPopup={handleOpenMenuPopup}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
                setMoviesToShow={setMoviesToShow}
                setFetchMoviesError={setFetchMoviesError}
              />
            }
          ></Route>
        </Route>

        <Route path={LINKS.PROFILE} element={<ProtectedRoute loggedIn={loggedIn} />}>
          <Route
            path={LINKS.PROFILE}
            element={
              <Profile
                loggedIn={loggedIn}
                openPopup={handleOpenMenuPopup}
                handleLogout={handleLogout}
                setActualUser={setActualUser}
              />
            }
          ></Route>
        </Route>

        <Route path={LINKS.SIGN_UP} element={<ProtectedRoute reversed loggedIn={loggedIn} />}>
          <Route
            path={LINKS.SIGN_UP}
            element={<Register setLoggedIn={setLoggedIn} setActualUser={setActualUser} />}
          ></Route>
        </Route>

        <Route path={LINKS.SIGN_IN} element={<ProtectedRoute reversed loggedIn={loggedIn} />}>
          <Route
            path={LINKS.SIGN_IN}
            element={<Login setLoggedIn={setLoggedIn} setActualUser={setActualUser} />}
          ></Route>
        </Route>
      </Routes>
      <NavigationPopup isOpen={menuPopupIsOpen} closeMenu={handleCloseMenuPopup}></NavigationPopup>
    </CurrentUserContext.Provider>
  );
}

export default App;
