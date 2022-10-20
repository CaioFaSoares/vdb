import React from 'react';

const ResultLibraryTypeImage = ({ value }) => {
  const imgClass = 'type-image-results';
  const cardtypes = value.split('/');
  const cardtypeImages = cardtypes.map((cardtype, index) => {
    const imgSrc = `${process.env.ROOT_URL}images/types/${cardtype
      .toLowerCase()
      .replace(/[\s,:!?'.-]/g, '')}.svg`;
    const imgTitle = cardtype;
    return (
      <img key={index} className={imgClass} src={imgSrc} title={imgTitle} />
    );
  });

  return <>{cardtypeImages}</>;
};

export default ResultLibraryTypeImage;
