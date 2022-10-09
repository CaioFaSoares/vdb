import React from 'react';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import { useApp } from 'context';

const TwdSearchFormPlayers = ({ players, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;

  const playersOptions = ['ANY', '100', '50', '30', '20', '10'];

  const playersFromOptions = [];
  const playersToOptions = [];

  playersOptions.map((i, index) => {
    if (i === 'ANY' || players.to === 'any' || parseInt(i) < players.to) {
      playersFromOptions.push({
        value: i.toLowerCase(),
        name: 'from',
        label: (
          <>
            <span className="me-1" />
            {i}
          </>
        ),
      });
    }

    if (i === 'ANY' || players.from === 'any' || parseInt(i) > players.from) {
      playersToOptions.push({
        value: i.toLowerCase(),
        name: 'to',
        label: (
          <>
            <span className="me-1" />
            {i}
          </>
        ),
      });
    }
  });

  return (
    <>
      <Row className="mx-0 align-items-center">
        <Col xs={2} className="d-flex px-1 justify-content-end">
          <div className="px-0">min</div>
        </Col>
        <Col xs={4} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={playersFromOptions}
            isSearchable={false}
            name="players-from"
            maxMenuHeight={maxMenuHeight}
            value={playersFromOptions.find((obj) => obj.value === players.from)}
            onChange={onChange}
          />
        </Col>
        <Col xs={2} className="d-flex px-1 justify-content-end">
          <div className="px-0">max</div>
        </Col>
        <Col xs={4} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={playersToOptions}
            isSearchable={false}
            name="players-to"
            maxMenuHeight={maxMenuHeight}
            value={playersToOptions.find((obj) => obj.value === players.to)}
            onChange={onChange}
          />
        </Col>
      </Row>
    </>
  );
};

export default TwdSearchFormPlayers;
