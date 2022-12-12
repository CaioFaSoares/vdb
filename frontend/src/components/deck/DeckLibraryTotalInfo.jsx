import React from 'react';
import {
  ResultLibraryTypeImage,
  ResultLibraryDisciplines,
  ResultLibraryClan,
} from 'components';

const DeckLibraryTotalInfo = ({ byClans, byTypes, byDisciplines }) => {
  const total = Object.values(byTypes).reduce((a, b) => a + b, 0);
  const totalExMasters = total - (byTypes['Master'] || 0);

  const byDisciplinesSorted = Object.keys(byDisciplines).sort((a, b) => {
    return byDisciplines[b] - byDisciplines[a];
  });

  const byClansSorted = Object.keys(byClans).sort((a, b) => {
    return byClans[b] - byClans[a];
  });

  return (
    <div className="space-y-2">
      <div>
        {Object.keys(byTypes).map((t, idx) => {
          return (
            <div key={idx} className="inline-block whitespace-nowrap pr-5">
              <div className="flex items-center space-x-1">
                <ResultLibraryTypeImage value={t} />
                <div className="flex ">{byTypes[t]}</div>
                <div className="text-neutral-500">
                  ({Math.round((byTypes[t] / total) * 100)}%)
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="space-y-1">
        <div>Excluding Master / Event:</div>
        {byDisciplinesSorted.map((d, idx) => {
          return (
            <div key={idx} className="inline-block whitespace-nowrap pr-5">
              <div className="flex items-center space-x-1">
                <ResultLibraryDisciplines value={d} />
                <div className="flex">{byDisciplines[d]}</div>
                <div className="text-neutral-500">
                  ({Math.round((byDisciplines[d] / totalExMasters) * 100)}
                  %)
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {byClansSorted.map((d, idx) => {
          return (
            <div key={idx} className="inline-block whitespace-nowrap pr-5">
              <div className="flex items-center space-x-1">
                <ResultLibraryClan value={d} />
                <div className="flex">{byClans[d]}</div>
                <div className="text-neutral-500">
                  ({Math.round((byClans[d] / total) * 100)}%)
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeckLibraryTotalInfo;
