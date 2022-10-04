import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useApp } from 'context';

const LibrarySearchFormCapacity = ({ value, onChange, onMorelessChange }) => {
  const { isWide, isMobile } = useApp();
  const topOffset = 525

  const capacity = [
    'ANY',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
  ];
  const options = [];

  capacity.map((i, index) => {
    let v;
    i == 'ANY' ? (v = i.toLowerCase()) : (v = i);

    options.push({
      value: v,
      name: 'capacity',
      label: (
        <>
          <span className="me-3 me-sm-1 me-lg-3" />
          {i}
        </>
      ),
    });
  });

  const moreless = [
    ['le', '<='],
    ['ge', '>='],
  ];
  const morelessOptions = [];

  moreless.map((i, index) => {
    morelessOptions.push({
      value: i[0],
      name: 'capacity',
      label: (
        <>
          <span className="me-3 me-sm-0 me-lg-3" />
          {i[1]}
        </>
      ),
    });
  });

  return (
    <Row className="py-1 ps-1 mx-0 align-items-center">
      <Col xs={3} className="d-flex px-0">
        <div className="bold blue">Capacity:</div>
      </Col>
      <Col xs={4} className="d-inline px-0">
        <Select
          classNamePrefix="react-select"
          options={morelessOptions}
          isSearchable={false}
          name="capacity-moreless"
          value={morelessOptions.find(
            (obj) => obj.value === value.moreless
          )}
          onChange={onMorelessChange}
        />
      </Col>
      <Col xs={5} className="d-inline pe-0 ps-1">
        <Select
          classNamePrefix="react-select"
          options={options}
          isSearchable={false}
          name="capacity"
          maxMenuHeight={
            isMobile
              ? 350
              : isWide
                ? 800 - topOffset
                : 700 - topOffset
          }
          value={options.find((obj) => obj.value === value.capacity)}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
}

export default LibrarySearchFormCapacity;
