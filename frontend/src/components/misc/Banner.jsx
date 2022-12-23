import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-bgSecondary dark:bg-bgSecondaryDark border border-borderSecondary dark:border-borderSecondaryDark flex w-full items-center justify-between p-2">
      <div onClick={() => navigate('/')} className="flex items-center">
        <img
          className="logo-image"
          src={`${process.env.ROOT_URL}images/misc/logo.svg`}
          title="logo"
          width="48"
          height="48"
        />
        <div className="text-fgSecondary dark:text-fgSecondaryDark inline pl-2 text-3xl font-bold">
          VDB
        </div>
      </div>
      <div className="inline space-y-1 px-2 text-xs italic">
        <div className="flex justify-end">If only I had a laptop...</div>
        <div className="flex justify-end">- Enkidu, The Noah</div>
      </div>
    </div>
  );
};

export default Banner;
