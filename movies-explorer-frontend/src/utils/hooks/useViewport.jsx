import { useState, useEffect } from 'react';
import {
  MOBILE_MEDIA_BREAK,
  LAPTOP_MEDIA_BREAK,
  MOBILE_INITIAL_CARDS,
  MOBILE_CARDS_TO_LOAD,
  LAPTOP_INITIAL_CARDS,
  LAPTOP_CARDS_TO_LOAD,
  DESKTOP_INITIAL_CARDS,
  DESKTOP_CARDS_TO_LOAD
} from '../constants';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  let cardsToLoad;
  let initialNumberOfCards;

  switch (true) {
    case width > LAPTOP_MEDIA_BREAK:
      cardsToLoad = DESKTOP_CARDS_TO_LOAD;
      initialNumberOfCards = DESKTOP_INITIAL_CARDS;
      break;
    case width <= MOBILE_MEDIA_BREAK:
      cardsToLoad = MOBILE_CARDS_TO_LOAD;
      initialNumberOfCards = MOBILE_INITIAL_CARDS;
      break;
    default:
      cardsToLoad = LAPTOP_CARDS_TO_LOAD;
      initialNumberOfCards = LAPTOP_INITIAL_CARDS;
  }

  return [initialNumberOfCards, cardsToLoad];
}

export default function useViewport() {
  const [cardsSetings, setCardsSetings] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setCardsSetings(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return cardsSetings;
}
