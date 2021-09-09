import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import precons from './forms_data/preconOptions.json';
import AppContext from '../../context/AppContext.js';

function SearchFormPrecon(props) {
  const { isMobile } = useContext(AppContext);

  const options = [];
  precons.map((i, index) => {
    if (i[0] != 'any' && i[0] != 'bcp') {
      const clanImages = i[4].map((clan, index) => {
        const imgSrc = `${process.env.ROOT_URL}images/clans/${clan
          .toLowerCase()
          .replace(/[\s,:!?'.\-]/g, '')}.svg`;

        return (
          <div className="d-inline pr-3" key={index}>
            {clan != 'Bundle' && clan != 'Mix' && (
              <img src={imgSrc} className="clan-image-results" />
            )}
          </div>
        );
      });

      options.push({
        value: `${i[1]}:${i[2]}`,
        name: 'precon',
        label: (
          <div className="d-flex justify-content-between align-items-center">
            <div className="pr-2">
              <div
                className={clanImages.length == 1 ? 'margin-full' : 'd-inline'}
              >
                {clanImages}
              </div>
              {i[3]}
            </div>
            <div className="small">{`${i[1]} '${i[0]}`}</div>
          </div>
        ),
      });
    } else {
      options.push({
        value: i[0],
        name: 'precon',
        label: (
          <>
            <span className="margin-full" />
            {i[1]}
          </>
        ),
      });
    }
  });

  const preconOptions = [
    ['only in', 'Only In'],
    ['first print', 'First Printed In'],
  ];

  const preconOptionsForm = preconOptions.map((i, index) => {
    return (
      <div key={index} className="custom-control custom-checkbox">
        <input
          id={`precon-${i[0]}`}
          value={i[0]}
          name="precon"
          className="custom-control-input"
          type="checkbox"
          checked={props.value[i[0]]}
          onChange={(e) => props.onChangeOptions(e)}
        />
        <label htmlFor={`precon-${i[0]}`} className="ml-3 custom-control-label">
          {i[1]}
        </label>
      </div>
    );
  });

  const filterOption = ({ label }, string) => {
    const l = label.props.children[1];
    if (l == 'any' || l == 'bcp') {
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
      <Row className="pt-1 pl-1 mx-0 align-items-center">
        <Col xs={3} className="d-flex px-0">
          <label className="h6 mb-0">Precon:</label>
        </Col>
        <Col xs={9} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={!isMobile}
            filterOption={filterOption}
            name="precon"
            value={options.find((obj) => obj.value === props.value.precon)}
            onChange={props.onChange}
          />
        </Col>
      </Row>
      <Row className="pb-1 pl-1 mx-0 align-items-center">
        <Col className="d-flex justify-content-end px-0">
          {preconOptionsForm}
        </Col>
      </Row>
    </>
  );
}

export default SearchFormPrecon;
