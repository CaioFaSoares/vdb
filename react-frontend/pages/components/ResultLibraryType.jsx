import React from 'react';

function ResultLibraryType(props) {
  const imgClass = 'type-image-results';
  const cardtypes = props.cardtype.split('/');
  const cardtypeImages = cardtypes.map((cardtype, index) => {
    const imgSrc = `${process.env.ROOT_URL}images/types/${cardtype
      .toLowerCase()
      .replace(/[\s,:!?'.\-]/g, '')}.svg`;
    const imgTitle = cardtype;
    return (
      <img key={index} className={imgClass} src={imgSrc} title={imgTitle} />
    );
  });

  if (props.total > 0) {
    return (
      <div
        className={
          props.inAdvSelect
            ? 'd-flex align-items-center adv-deck-table'
            : 'd-flex align-items-center'
        }
      >
        {cardtypeImages}
        <div className="px-1">
          {props.cardtype} [{props.total}]
          {props.trifleTotal ? <> - {props.trifleTotal} trifle</> : null}
        </div>
      </div>
    );
  } else if (props.total == 0) {
    return (
      <div className="d-inline align-items-center">
        {cardtypeImages}
        <div className="d-inline px-1">{props.cardtype}</div>
      </div>
    );
  } else {
    return <>{cardtypeImages}</>;
  }
}

export default ResultLibraryType;
