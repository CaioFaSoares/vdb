import React from 'react';
import { DeckRecommendationModal } from '@/components';
import { useApp } from '@/context';
import { useFetch } from '@/hooks';

const DeckRecommendation = ({ setShow, deck }) => {
  const { cryptCardBase, libraryCardBase, setShowFloatingButtons } = useApp();
  const url = `${import.meta.env.VITE_API_URL}/deck/${
    deck.deckid
  }/recommendation`;
  const { value } = useFetch(url, {}, []);

  let crypt;
  let library;
  if (value) {
    crypt = value.crypt.map((cardid) => {
      return cryptCardBase[cardid];
    });
    library = value.library.map((cardid) => {
      return libraryCardBase[cardid];
    });
  }

  const handleCloseModal = () => {
    setShow(false);
    setShowFloatingButtons(true);
  };

  return (
    <DeckRecommendationModal
      handleClose={handleCloseModal}
      crypt={crypt}
      library={library}
    />
  );
};

export default DeckRecommendation;
