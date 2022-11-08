import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Stack,
  Form,
  FormControl,
  InputGroup,
  Button,
} from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import Check2 from 'assets/images/icons/check2.svg';
import {
  SearchAdditionalFormsText,
  SearchFormButtonLogicToggle,
  SearchFormButtonAddText,
  SearchFormButtonDelText,
} from '../shared_search_components';
import { useApp } from 'context';

const SearchFormTextAndButtons = ({
  searchForm,
  value,
  preresults,
  showLimit,
  onChange,
  onChangeOptions,
  handleShowResults,
  handleClearButton,
  hideMissing,
  setHideMissing,
}) => {
  const { inventoryMode, isMobile } = useApp();
  const [text, setText] = useState('');

  useEffect(() => {
    if (!text && value[0].value) {
      setText(value[0].value);
    } else if (!value[0].value) {
      setText('');
    }
  }, [value]);

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

  const onTextChange = (e) => {
    onChange(e);
    setText(e.target.value);
  };

  const OptionsForm = options.map((opt, index) => {
    return (
      <Form.Check
        key={index}
        name={0}
        value={opt.value}
        type="checkbox"
        className="small"
        id={`text-${opt.value}`}
        label={opt.label}
        checked={
          opt.value === 'regex'
            ? value[0].regex || false
            : value[0].in === opt.value
        }
        onChange={onChangeOptions}
      />
    );
  });

  return (
    <Row className="ps-0 ps-md-1 mx-0 align-items-center">
      {isMobile ? (
        <FormControl
          placeholder="Card Name / Text / RegEx"
          type="text"
          name={0}
          autoComplete="off"
          spellCheck="false"
          value={value[0].value}
          onChange={onChange}
        />
      ) : (
        <InputGroup className="px-0">
          <FormControl
            placeholder="Card Name / Text / RegEx"
            type="text"
            name={0}
            autoComplete="off"
            spellCheck="false"
            value={text}
            onChange={onTextChange}
          />
          {preresults > showLimit && (
            <Button variant="primary" onClick={handleShowResults}>
              <Check2 /> FOUND {preresults}
            </Button>
          )}
          <Button
            title="Clear Forms & Results"
            variant="primary"
            onClick={handleClearButton}
          >
            <div className="d-flex align-items-center">
              <X />
            </div>
          </Button>
        </InputGroup>
      )}
      <Row className="mx-0 px-0 pt-1">
        <Col xs={2} md={3} className="px-0">
          <Stack direction="horizontal" gap={1}>
            {value[0].value !== '' && (
              <>
                <SearchFormButtonLogicToggle
                  name="text"
                  value={value[0].logic}
                  i={0}
                  searchForm={searchForm}
                />
                {value.length == 1 ? (
                  <SearchFormButtonAddText searchForm={searchForm} />
                ) : (
                  <SearchFormButtonDelText searchForm={searchForm} i={0} />
                )}
              </>
            )}
          </Stack>
        </Col>
        <Col className="d-flex justify-content-end px-0">
          <Stack direction="horizontal" gap={2} className="align-items-start">
            {OptionsForm}
          </Stack>
        </Col>
      </Row>
      <SearchAdditionalFormsText
        value={value}
        onChange={onChange}
        onChangeOptions={onChangeOptions}
        searchForm={searchForm}
      />
      {inventoryMode && (
        <Form.Check
          name={0}
          value="hideMissing"
          type="checkbox"
          className="small pt-1"
          id="text-hideMissing"
          label="Search In Inventory"
          checked={hideMissing}
          onChange={() => setHideMissing(!hideMissing)}
        />
      )}
    </Row>
  );
};

export default SearchFormTextAndButtons;
