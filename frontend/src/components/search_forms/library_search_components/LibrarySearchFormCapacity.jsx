import React from 'react';
import { Col } from 'react-bootstrap';
import Select from 'react-select';
import { useApp } from 'context';

const LibrarySearchFormCapacity = ({ value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'capacity';
  const options = [
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
  ].map((i) => ({
    value: i === 'ANY' ? i.toLowerCase() : i,
    name: name,
    label: (
      <>
        <span className="me-3 me-sm-1 me-lg-3" />
        {i}
      </>
    ),
  }));

  const morelessOptions = [
    ['le', '<='],
    ['ge', '>='],
  ].map((i) => ({
    value: i[0],
    name: name,
    label: (
      <>
        <span className="me-3 me-sm-0 me-lg-3" />
        {i[1]}
      </>
    ),
  }));

  return (
    <div className="flex flex-row py-1 ps-1 mx-0 items-center">
      <Col xs={3} className="flex px-0">
        <div className="font-bold text-blue">Capacity:</div>
      </Col>
      <Col xs={4} className="d-inline px-0">
        <Select
          classNamePrefix="react-select"
          options={morelessOptions}
          isSearchable={false}
          name={0}
          value={morelessOptions.find((obj) => obj.value === value.moreless)}
          onChange={onChange}
        />
      </Col>
      <Col xs={5} className="d-inline pe-0 ps-1">
        <Select
          classNamePrefix="react-select"
          options={options}
          isSearchable={false}
          name={0}
          maxMenuHeight={maxMenuHeight}
          value={options.find((obj) => obj.value === value[name])}
          onChange={onChange}
        />
      </Col>
    </div>
  );
};

export default LibrarySearchFormCapacity;
