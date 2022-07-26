import React from 'react';
import { SortButton } from 'components';

const TwdResultTotal = ({ decks, sortMethods, sortMethod, setSortMethod }) => {
  const byYear = {};
  let total = 0;

  decks.map((deck, index) => {
    const year = `'${deck['creation_date'].slice(2, 4)}`;
    if (byYear[year]) {
      byYear[year] += 1;
    } else {
      byYear[year] = 1;
    }
    total += 1;
  });

  const totalOutput = Object.keys(byYear).map((k) => {
    return (
      <span key={k} className="d-inline-block nowrap pe-3">
        <span className="blue">
          <b>{k}: </b>
        </span>
        {byYear[k]}
      </span>
    );
  });

  const value = (
    <>
      <div className="px-2 nowrap">
        <b>TOTAL: {total}</b>
      </div>
      <div>{totalOutput}</div>
      <SortButton
        sortMethod={sortMethod}
        sortMethods={sortMethods}
        setSortMethod={setSortMethod}
      />
    </>
  );

  return (
    <div className="d-flex align-items-center justify-content-between info-message">
      {value}
    </div>
  );
};
export default TwdResultTotal;
