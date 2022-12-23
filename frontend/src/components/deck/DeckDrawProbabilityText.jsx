import React from 'react';
import { drawProbability } from 'utils';

const DeckDrawProbabilityText = ({ N, n, k }) => {
  return (
    <div className="text-fgSecondary dark:text-fgSecondaryDark">
      <div className="flex justify-between">
        <div>1+</div>
        <div>{`${Math.floor(drawProbability(1, N, n, k) * 100)}%`}</div>
      </div>
      <div className="flex justify-between">
        <div>2+</div>
        <div>
          {k < 2 ? null : `${Math.floor(drawProbability(2, N, n, k) * 100)}%`}
        </div>
      </div>
      <div className="flex justify-between">
        <div>3+</div>
        <div>
          {k < 3 ? null : `${Math.floor(drawProbability(3, N, n, k) * 100)}%`}
        </div>
      </div>
      <div className="flex justify-between">
        <div>4+</div>
        <div>
          {k < 4 ? null : `${Math.floor(drawProbability(4, N, n, k) * 100)}%`}
        </div>
      </div>
    </div>
  );
};

export default DeckDrawProbabilityText;
