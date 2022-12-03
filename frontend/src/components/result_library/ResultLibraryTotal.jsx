import React from 'react';
import { Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { ResultLibraryTypeImage, SortButton } from 'components';
import { setLibraryCompare } from 'context';

const ResultLibraryTotal = ({
  cards,
  sortMethods,
  sortMethod,
  setSortMethod,
  inCompare,
  inHoF,
}) => {
  const byTypes = {};
  let total = 0;

  cards.map((card) => {
    if (byTypes[card.Type]) {
      byTypes[card.Type] += 1;
    } else {
      byTypes[card.Type] = 1;
    }
    total += 1;
  });

  const totalOutput = Object.keys(byTypes).map((k) => {
    return (
      <span key={k} className="d-inline-block whitespace-nowrap pe-3">
        <div className="flex items-center">
          <ResultLibraryTypeImage value={k} />
          {byTypes[k]}
        </div>
      </span>
    );
  });

  const value = (
    <>
      <div className="px-2 whitespace-nowrap">
        <b>
          {inHoF ? 'LIBRARY' : inCompare ? 'COMPARE' : 'TOTAL'}: {total}
        </b>
      </div>
      <div className="pt-2">{totalOutput}</div>
      <div className="flex">
        {!inCompare ? (
          <SortButton
            sortMethods={sortMethods}
            sortMethod={sortMethod}
            setSortMethod={setSortMethod}
          />
        ) : (
          <div className="ms-1">
            <Button
              title="Clear Compare"
              variant="primary"
              onClick={() => setLibraryCompare(undefined)}
            >
              <X width="16" height="20" viewBox="0 0 16 16" />
            </Button>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="flex items-center justify-between info-message pe-1 pe-md-0">
      {value}
    </div>
  );
};

export default ResultLibraryTotal;
