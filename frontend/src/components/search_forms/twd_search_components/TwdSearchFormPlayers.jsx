import React from 'react';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';

function TwdSearchFormPlayers(props) {
  const players = ['ANY', '100', '50', '30', '20', '10'];

  const playersFromOptions = [];
  const playersToOptions = [];

  players.map((i, index) => {
    if (
      i === 'ANY' ||
      props.players.to === 'any' ||
      parseInt(i) < props.players.to
    ) {
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

    if (
      i === 'ANY' ||
      props.players.from === 'any' ||
      parseInt(i) > props.players.from
    ) {
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
            value={playersFromOptions.find(
              (obj) => obj.value === props.players.from
            )}
            onChange={props.onChange}
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
            value={playersToOptions.find(
              (obj) => obj.value === props.players.to
            )}
            onChange={props.onChange}
          />
        </Col>
      </Row>
    </>
  );
}

export default TwdSearchFormPlayers;
