import React, { useState, useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import Hammer from '../../assets/images/icons/hammer.svg';
import CardPopover from './CardPopover.jsx';
import TwdSearchFormQuantityButtons from './TwdSearchFormQuantityButtons.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptModal from './ResultCryptModal.jsx';
import AppContext from '../../context/AppContext.js';

function TwdSearchFormCrypt(props) {
  const { isMobile } = useContext(AppContext);
  const [modalCard, setModalCard] = useState(undefined);

  const handleAdd = (event) => {
    const newState = props.state;
    newState[event] = 1;
    props.setState((prevState) => ({
      ...prevState,
      crypt: newState,
    }));
  };

  const cryptCardsList = Object.keys(props.state)
    .filter((id) => props.state[id] > 0)
    .map((id) => {
      return (
        <div key={id} className="d-flex align-items-center">
          <TwdSearchFormQuantityButtons
            state={props.state}
            setState={props.setState}
            id={id}
            q={props.state[id]}
            target="crypt"
          />
          {!isMobile ? (
            <OverlayTrigger
              placement="left"
              overlay={<CardPopover card={props.cardBase[id]} />}
            >
              <div
                className="pt-1"
                onClick={() => setModalCard(props.cardBase[id])}
              >
                <ResultCryptName card={props.cardBase[id]} />
              </div>
            </OverlayTrigger>
          ) : (
            <div
              className="pt-1"
              onClick={() => setModalCard(props.cardBase[id])}
            >
              <ResultCryptName card={props.cardBase[id]} />
            </div>
          )}
        </div>
      );
    });

  const loadOptions = (inputValue) => {
    const url = `${process.env.API_URL}search/crypt`;
    const input = { name: inputValue };
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    };

    if (inputValue.length > 2) {
      return fetch(url, options).then((response) => response.json());
    } else {
      return null;
    }
  };

  return (
    <>
      <AsyncSelect
        classNamePrefix="react-select"
        cacheOptions
        autoFocus={false}
        value={null}
        placeholder="Add Crypt Card"
        loadOptions={loadOptions}
        onChange={handleAdd}
        getOptionLabel={(card) => (
          <>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <ResultCryptCapacity value={props.cardBase[card]['Capacity']} />
                <div className="px-2">
                  {props.cardBase[card]['Banned'] ? (
                    <>
                      <strike>{props.cardBase[card]['Name']}</strike>
                      {props.cardBase[card]['Adv'] && (
                        <div className="d-inline pl-1">
                          <img
                            className="advanced-image-results"
                            src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
                            title="Advanced"
                          />
                        </div>
                      )}
                      <div className="d-inline pl-1">
                        <Hammer />
                      </div>
                    </>
                  ) : (
                    <>
                      {props.cardBase[card]['Name']}
                      {props.cardBase[card]['Adv'] && (
                        <div className="d-inline pl-1">
                          <img
                            className="advanced-image-results"
                            src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
                            title="Advanced"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="pr-3">
                  <ResultCryptClan value={props.cardBase[card]['Clan']} />
                </div>
              </div>
              <div className="d-flex flex-nowrap">
                <ResultCryptDisciplines
                  value={props.cardBase[card]['Disciplines']}
                />
              </div>
            </div>
          </>
        )}
      />
      {cryptCardsList}
      {modalCard && (
        <ResultCryptModal
          show={modalCard ? true : false}
          card={modalCard}
          handleClose={() => setModalCard(false)}
        />
      )}
    </>
  );
}

export default TwdSearchFormCrypt;
