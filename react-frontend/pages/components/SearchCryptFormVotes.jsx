import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';

function SearchCryptFormVotes(props) {
  const votes = [
    ['any', 'ANY'],
    ['0', '0'],
    ['1', '1+'],
    ['2', '2+'],
    ['3', '3+'],
    ['4', '4+'],
  ];

  const options = [];

  votes.map((i, index) => {
    options.push({
      value: i[0],
      name: 'votes',
      label: (
        <>
          <span
            style={{
              display: 'inline-block',
              width: '40px',
              textAlign: 'center',
            }}
          />
          {i[1]}
        </>
      ),
    });
  });

  return (
    <Row className="py-1 mx-0 align-items-center">
      <Col xs={3} className="d-flex px-0">
        <label className="h6 mb-0">
          Votes:
        </label>
      </Col>
      <Col xs={9} className="d-inline px-0">
        <Select
          options={options}
          isSearchable={false}
          name="votes"
          value={options.find((obj) => obj.value === props.value.toLowerCase())}
          onChange={props.onChange}
        />
      </Col>
    </Row>
  );
}

export default SearchCryptFormVotes;
