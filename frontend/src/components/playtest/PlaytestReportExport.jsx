import React from 'react';
import { Hr, PlaytestScores } from '@/components';
import { useFetch } from '@/hooks';

const Report = ({ id, text, score }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full justify-between items-center">
        <div title={id} className="text-fgName dark:text-fgNameDark">
          &lt;{id.substring(0, 20)}
          {id.length > 20 && '...'}&gt;
        </div>{' '}
        <div className="flex justify-end">
          <PlaytestScores value={score} />
        </div>
      </div>
      <div>
        {text.split('\n').map((line, idx) => (
          <div key={idx}>{line}</div>
        ))}
      </div>
    </div>
  );
};

const PlaytestReportExport = ({ id, isPrecon = false }) => {
  const url = `${import.meta.env.VITE_API_URL}/playtest/export/${
    isPrecon ? 'precons' : 'cards'
  }/${id}`;
  const { value: dataValue } = useFetch(url, {}, [id]);

  return (
    <div className="flex basis-full flex-col gap-4">
      {dataValue &&
        Object.keys(dataValue).map((id, idx) => {
          return (
            <React.Fragment key={id}>
              <Report
                id={id}
                text={dataValue[id].text}
                score={dataValue[id].score}
              />
              {idx + 1 < Object.keys(dataValue).length && <Hr />}
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default PlaytestReportExport;
