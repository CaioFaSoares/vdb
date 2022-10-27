import React from 'react';
import { Row, Col, Stack, Form, FormControl } from 'react-bootstrap';
import {
  SearchFormButtonAddText,
  SearchFormButtonDelText,
  SearchFormButtonLogicToggle,
} from '../shared_search_components';
import { useApp } from 'context';

const SearchAdditionalFormsText = ({
  value,
  onChange,
  onChangeOptions,
  searchForm,
}) => {
  const { isMobile, isWide } = useApp();
  const options = [
    {
      value: 'name',
      label: 'Only in Name',
    },
    {
      value: 'text',
      label: 'Only in Text',
    },
    {
      value: 'regex',
      label: 'Regex',
    },
  ];

  const forms = [];
  for (let i = 1; i < value.length; i++) {
    forms.push(
      <Row key={i} className="px-0 mx-0 pt-2 align-items-center">
        <FormControl
          placeholder="Card Name / Text / RegEx"
          type="text"
          name={i}
          autoComplete="off"
          spellCheck="false"
          value={value[i].value}
          onChange={onChange}
          autoFocus={true}
        />
        <Row className="mx-0 px-0 pt-1">
          <Col xs={2} md={3} className="px-0">
            <Stack direction="horizontal" gap={1}>
              <SearchFormButtonLogicToggle
                name="text"
                value={value[i].logic}
                i={i}
                searchForm={searchForm}
              />
              <SearchFormButtonAddText searchForm={searchForm} />
              <SearchFormButtonDelText searchForm={searchForm} i={i} />
            </Stack>
          </Col>
          <Col className="d-flex justify-content-end px-0">
            <Stack direction="horizontal" gap={2} className="align-items-start">
              {options.map((opt, index) => {
                return (
                  <Form.Check
                    key={index}
                    name={i}
                    value={opt.value}
                    type="checkbox"
                    className="small"
                    id={`text-${i}-${opt.value}`}
                    label={opt.label}
                    onChange={(e) => onChangeOptions(e)}
                  />
                );
              })}
            </Stack>
          </Col>
        </Row>
      </Row>
    );
  }

  return <>{forms}</>;
};

export default SearchAdditionalFormsText;
