import React from 'react';
import { ResultDisciplineImage } from 'components';
import virtuesList from 'assets/data/virtuesList.json';

const DisciplinesCryptSummary = ({ disciplinesDetailed }) => {
  const disciplinesSorted = Object.keys(disciplinesDetailed).sort((a, b) => {
    return disciplinesDetailed[b][0] - disciplinesDetailed[a][0];
  });

  let withDisciplines = false;
  let withVirtues = false;

  const DisciplinesInfo = disciplinesSorted
    .filter((d) => !virtuesList.includes(d) && disciplinesDetailed[d][0] > 0)
    .map((d, idx) => {
      withDisciplines = true;
      return (
        <span key={idx} className="pl-0 pr-3 inline-block whitespace-nowrap">
          <div className="pr-1 flex items-center">
            <ResultDisciplineImage
              title={`${d} Superior | Inferior`}
              superior={true}
              value={d}
            />
            <div className="pl-1 flex">
              {disciplinesDetailed[d][2]} <div className="gray px-1">|</div>{' '}
              {disciplinesDetailed[d][1]}
            </div>
          </div>
        </span>
      );
    });

  const VirtuesInfo = disciplinesSorted
    .filter((d) => virtuesList.includes(d) && disciplinesDetailed[d][0] > 0)
    .map((d, idx) => {
      withVirtues = true;
      return (
        <span key={idx} className="pl-0 pr-3 inline-block whitespace-nowrap">
          <div className="pr-1 flex items-center">
            <ResultDisciplineImage value={d} />
            <div className="pl-1 flex">{disciplinesDetailed[d][1]}</div>
          </div>
        </span>
      );
    });

  return (
    <>
      {withDisciplines && <div className="py-1">{DisciplinesInfo}</div>}
      {withVirtues && <div className="py-1">{VirtuesInfo}</div>}
    </>
  );
};

export default DisciplinesCryptSummary;
