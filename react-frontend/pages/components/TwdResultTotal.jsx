import React, { useContext } from 'react';
import AppContext from '../../context/AppContext.js';

function TwdResultTotal(props) {
  const { twdResults } = useContext(AppContext);

  const byYear = {};
  let total = 0;

  twdResults.map((deck, index) => {
    const year = `'${deck['date'].slice(2, 4)}`;
    if (byYear[year]) {
      byYear[year] += 1;
    } else {
      byYear[year] = 1;
    }
    total += 1;
  });

  const totalOutput = Object.keys(byYear).map((k) => {
    return (
      <span key={k} className="d-inline-block nobr pe-3">
        <span className="blue">
          <b>{k}: </b>
        </span>
        {byYear[k]}
      </span>
    );
  });

  const value = (
    <>
      <div className="px-2 nobr">
        <b>TOTAL: {total}</b>
      </div>
      <div>{totalOutput}</div>
      <div />
    </>
  );

  return (
    <div className="d-flex align-items-center justify-content-between info-message">
      {value}
    </div>
  );
}
export default TwdResultTotal;
