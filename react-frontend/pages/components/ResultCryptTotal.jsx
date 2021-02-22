import React from 'react';
import AlertMessage from './AlertMessage.jsx';
import ResultCryptSortForm from './ResultCryptSortForm.jsx';

function ResultCryptTotal(props) {
  const byGroups = {};
  const byGroupsCapacityTotal = {};
  let total = 0;

  props.cards.map((card, index) => {
    if (byGroups[card['Group']]) {
      byGroups[card['Group']] += 1;
    } else {
      byGroups[card['Group']] = 1;
    }
    if (byGroupsCapacityTotal[card['Group']]) {
      byGroupsCapacityTotal[card['Group']] += card['Capacity']
    } else {
      byGroupsCapacityTotal[card['Group']] = card['Capacity']
    }
    total += 1;
  });

  const totalOutput = Object.keys(byGroups).map((key, index) => {
    return (
      <span key={index} className="d-inline-block nobr pr-3">
        <span className="crypt-total">
          <b>G{key}:</b>
        </span>
        {byGroups[key]}
        <div className="d-flex small justify-content-center">
        ~{Math.round((byGroupsCapacityTotal[key] / byGroups[key]) * 10) / 10}
        </div>
      </span>
    );
  });

  const value = (
    <>
      <div className="px-2 nobr">
        <b>TOTAL: {total}</b>
      </div>
      <div>{totalOutput}</div>
      <ResultCryptSortForm
        value={props.sortMethod}
        onChange={props.handleChange}
      />
    </>
  );

  return <AlertMessage className="info-message">{value}</AlertMessage>;
}

export default ResultCryptTotal;
