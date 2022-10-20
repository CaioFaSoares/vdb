import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-between align-items-center logo-box mb-3 my-md-3">
      <div
        onClick={() => navigate('/about')}
        className="d-flex align-items-center"
      >
        <img
          className="logo-image"
          src={`${process.env.ROOT_URL}images/misc/logo.svg`}
          title="logo"
          width="48"
          height="48"
        />
        <div className="d-inline logo-text ps-2">VDB</div>
      </div>
      <div className="d-inline px-2">
        <div className="d-flex justify-content-end small">
          <i>If only I had a laptop...</i>
        </div>
        <div className="d-flex justify-content-end small">
          <i>- Enkidu, The Noah</i>
        </div>
      </div>
    </div>
  );
};

export default Banner;
