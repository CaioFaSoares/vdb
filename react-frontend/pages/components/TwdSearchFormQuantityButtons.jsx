import React from 'react';
import { Button } from 'react-bootstrap';

function TwdSearchFormQuantityButtons({ state, setState, id, q, target }) {
  const handleChange = (id, q) => {
    const newState = state;
    newState[id] = q;
    setState((prevState) => ({
      ...prevState,
      [target]: newState,
    }));
  };

  return (
    <div className="d-flex align-items-center justify-content-between pr-2">
      <Button
        className="quantity"
        variant="outline-secondary"
        onClick={() => handleChange(id, q - 1)}
        block
      >
        -
      </Button>
      <div className="px-1">{q}</div>
      <Button
        className="quantity"
        variant="outline-secondary"
        onClick={() => handleChange(id, q + 1)}
        block
      >
        +
      </Button>
    </div>
  );
}

export default TwdSearchFormQuantityButtons;
