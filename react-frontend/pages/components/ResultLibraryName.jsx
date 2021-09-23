import React from 'react';
import Hammer from '../../assets/images/icons/hammer.svg';

function ResultLibraryName(props) {
  return (
    <>
      <div className="d-inline name">
        {props.card['Banned'] ? (
          <>
            <strike>{props.card['Name']}</strike>
            <span className="ps-1">
              <Hammer />
            </span>
          </>
        ) : (
          <>{props.card['Name']}</>
        )}
      </div>
    </>
  );
}

export default ResultLibraryName;
