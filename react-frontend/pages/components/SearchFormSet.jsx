import React, { useContext } from 'react';
import { Form, Stack, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import setsAndPrecons from './forms_data/setsAndPrecons.json';
import AppContext from '../../context/AppContext.js';

function SearchFormSet(props) {
  const { isMobile } = useContext(AppContext);

  const preOptions = [
    {
      set: 'any',
      name: 'ANY',
    },
    {
      set: 'bcp',
      name: 'ANY BCP',
    },
  ];

  Object.keys(setsAndPrecons).map((i) => {
    preOptions.push({
      set: i,
      name: setsAndPrecons[i].name,
      year: setsAndPrecons[i].year,
    });
  });

  const options = [];

  preOptions.map((i, index) => {
    if (i.set == 'any' || i.set == 'bcp') {
      options.push({
        value: i.set,
        name: 'set',
        label: (
          <>
            <span className="margin-full" />
            {i.name}
          </>
        ),
      });
    } else {
      options.push({
        value: i.set,
        name: 'set',
        label: (
          <div className="d-flex justify-content-between align-items-center">
            <div className="pe-2">{i.name}</div>
            <div className="ps-2 small">{i.year}</div>
          </div>
        ),
      });
    }
  });

  const setOptions = [
    ['or newer', 'Or Newer'],
    ['only in', 'Only In'],
    ['first print', 'First Printed In'],
  ];

  const setOptionsForm = setOptions.map((i, index) => {
    return (
      <Form.Check
        key={index}
        name="set"
        value={i[0]}
        type="checkbox"
        id={`set-${i[0]}`}
        label={i[1]}
        checked={props.value[i[0]]}
        onChange={(e) => props.onChangeOptions(e)}
      />
    );
  });

  const filterOption = ({ label, value }, string) => {
    let name = undefined;
    if (value == 'any' || value == 'bcp') {
      name = label.props.children[1];
    } else {
      name = label.props.children[0].props.children;
    }

    if (name) {
      return name.toLowerCase().includes(string);
    } else {
      return true;
    }
  };

  return (
    <>
      <Row className="pt-1 ps-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <div className="bold blue">Set:</div>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={!isMobile}
            menuPlacement={isMobile ? 'top' : 'bottom'}
            filterOption={filterOption}
            name="set"
            value={options.find((obj) => obj.value === props.value.set)}
            onChange={props.onChange}
          />
        </Col>
      </Row>
      <Row className="pb-1 ps-1 mx-0 align-items-center">
        <Col className="d-flex justify-content-end px-0">
          <Stack direction="horizontal" gap={3}>
            {setOptionsForm}
          </Stack>
        </Col>
      </Row>
    </>
  );
}

export default SearchFormSet;
