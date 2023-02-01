import React from 'react';
import Spinner from '@/assets/images/icons/three-dots.svg';
import {
  ResultCryptTable,
  DeckRecommendationLibrary,
  Modal,
} from '@/components';

const DeckRecommendationModal = ({ handleClose, crypt, library }) => {
  return (
    <Modal handleClose={handleClose} size="lg" title="Card Ideas">
      <div>
        <div className="flex flex-row gap-5">
          <div className="basis-full md:basis-7/12">
            <div className="flex h-10 items-center justify-between bg-bgSecondary px-2 font-bold dark:bg-bgSecondaryDark">
              Crypt
            </div>
            {crypt ? (
              <ResultCryptTable resultCards={crypt} inRecommendation />
            ) : (
              <div className="flex justify-center pt-5">
                <Spinner width="35" height="35" viewBox="0 0 16 16" />
              </div>
            )}
          </div>
          <div className="basis-full md:basis-5/12">
            <div className="flex h-10 items-center justify-between bg-bgSecondary px-2 font-bold dark:bg-bgSecondaryDark">
              Library
            </div>
            {library ? (
              <DeckRecommendationLibrary cards={library} />
            ) : (
              <div className="flex justify-center pt-5">
                <Spinner width="35" height="35" viewBox="0 0 16 16" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeckRecommendationModal;
