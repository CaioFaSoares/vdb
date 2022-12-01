import React from 'react';
import { Form, Stack, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import GiftFill from 'assets/images/icons/gift-fill.svg';
import { ResultLibraryClan } from 'components';
import {
  SearchAdditionalForms,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from './';
import { useApp } from 'context';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';

const SearchFormPrecon = ({ value, searchForm, onChange, onChangeOptions }) => {
  const { playtest, isMobile, isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'precon';
  const preOptions = [];

  Object.keys(setsAndPrecons)
    .filter((i) => playtest || i !== 'PLAYTEST')
    .map((i) => {
      if (setsAndPrecons[i].precons) {
        const year = setsAndPrecons[i].date.slice(2, 4);
        Object.keys(setsAndPrecons[i].precons).map((j) => {
          const precon = j;
          const name = setsAndPrecons[i].precons[j].name;
          const clans = setsAndPrecons[i].precons[j].clan.split('/');
          preOptions.push({
            set: i,
            precon: precon,
            year: year,
            name: name,
            clans: clans,
          });
        });
      }
    });

  const options = [
    {
      value: 'any',
      name: name,
      label: (
        <div className="d-flex align-items-center">
          <div className="d-flex w-40px" />
          ANY
        </div>
      ),
    },
    {
      value: 'bcp',
      name: name,
      label: <>Any BCP (excl. Promo)</>,
    },
  ];

  preOptions.map((i) => {
    if (i.set === 'any') {
      options.push({
        value: i.set,
        name: name,
        label: (
          <div className="d-flex align-items-center">
            <div className="d-flex w-40px" />
            {i.name}
          </div>
        ),
      });
    } else {
      const clanImages = i.clans.map((clan) => {
        return (
          <React.Fragment key={clan}>
            {clan === 'Bundle' ? (
              <div className="d-flex align-items-center clan-image-results">
                <GiftFill />
              </div>
            ) : clan === 'Mix' ? null : (
              <ResultLibraryClan value={clan} />
            )}
          </React.Fragment>
        );
      });

      options.push({
        value: `${i.set}:${i.precon}`,
        name: 'precon',
        label: (
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center pe-2">
              <div
                className={
                  clanImages.length == 1
                    ? 'd-flex justify-content-center align-items-center w-40px'
                    : 'd-inline pe-2'
                }
              >
                {clanImages}
              </div>
              {i.name}
            </div>
            <div className="small">{`${i.set} '${i.year}`}</div>
          </div>
        ),
      });
    }
  });

  const printFormOptions = [
    {
      value: 'only',
      label: 'Only In',
      title: 'Printed only in selected Set',
    },
    {
      value: 'first',
      label: 'First Print',
      title: 'Printed first in selected Set',
    },
    {
      value: 'reprint',
      label: 'Reprint',
      title: 'Reprinted in selected Set',
    },
  ];

  const printForm = printFormOptions.map((i) => {
    return (
      <Form.Check
        key={i.value}
        name="precon"
        value={i.value}
        type="checkbox"
        className="small"
        id={`precon-${i.value}`}
        label={i.label}
        title={i.title}
        disabled={value.value[0] === 'bcp' && i.value === 'reprint'}
        checked={value['print'] === i.value}
        onChange={(e) => onChangeOptions(e)}
      />
    );
  });

  const filterOption = ({ label, value }, string) => {
    let name = undefined;
    if (value == 'any' || value == 'bcp') {
      name = label.props.children[1];
    } else {
      name = label.props.children[0].props.children[1];
    }
    if (name) {
      return name.toLowerCase().includes(string);
    } else {
      return true;
    }
  };

  return (
    <>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col xs={3} className="px-0">
          <div className="bold blue">Precon:</div>
          {value.value[0] !== 'any' && (
            <div className="d-flex justify-content-end pe-1">
              {value.value.length == 1 ? (
                <SearchFormButtonAdd searchForm={searchForm} name={name} />
              ) : (
                <SearchFormButtonDel
                  searchForm={searchForm}
                  i={0}
                  name={name}
                />
              )}
            </div>
          )}
        </Col>
        <Col xs={9} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={!isMobile}
            menuPlacement="top"
            filterOption={filterOption}
            name={0}
            maxMenuHeight={maxMenuHeight}
            value={options.find((obj) => obj.value === value.value[0])}
            onChange={onChange}
          />
        </Col>
      </Row>
      <SearchAdditionalForms
        value={value}
        name={name}
        searchForm={searchForm}
        menuPlacement={isMobile ? 'top' : 'bottom'}
        options={options}
        onChange={onChange}
        maxMenuHeight={maxMenuHeight}
      />
      <Row className="pb-1 ps-1 mx-0 align-items-center">
        <Col className="d-flex justify-content-end px-0">
          <Stack direction="horizontal" gap={3}>
            {printForm}
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default SearchFormPrecon;
