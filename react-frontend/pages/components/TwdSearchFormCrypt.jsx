import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import Hammer from '../../assets/images/icons/hammer.svg';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';

function TwdSearchFormCrypt({ value, setValue, isMobile, showImage, setShowImage}) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [cryptCards, setCryptCards] = useState([])

  const handleChange = (val) => {
    if (cryptCards.indexOf(val) < 0) {
      setCryptCards((prevState, index) => ([
        ...prevState,
        val
      ]));
      setSelectedValue('')
    }
  }

  const cryptCardsList = cryptCards.map((card, index) => {
    return(
      <div key={index} className="d-flex align-items-center">
        <ResultCryptName
          isMobile={isMobile}
          showImage={showImage}
          setShowImage={setShowImage}
          placement="left"
          card={card}
        />
        <div className="px-1">
          <Button
            variant="outline-secondary"
            onClick={() => setCryptCards(cryptCards.filter(value => value != card))}
          >
            X
          </Button>
        </div>
      </div>
    )
  })

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

  useEffect(() => {
    const newState = {};
    cryptCards.map((i, index) => {
      newState[i.Id] = true;
    })
    setValue((prevState) => ({
      ...prevState,
      crypt: newState,
    }));
  }, [cryptCards]);

  return (
    <>
      <AsyncSelect
        cacheOptions
        defaultOptions
        autoFocus={false}
        value={selectedValue}
        placeholder="Add Crypt Card"
        loadOptions={loadOptions}
        onChange={handleChange}
        getOptionLabel={(card) => {
          return(
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <ResultCryptCapacity value={card['Capacity']} />
                <span className="px-2">
                  {card['Name']}
                  {card['Banned'] && <Hammer />}
                  {card['Adv'] && (
                    <span className="pl-1">
                      <img className='advanced-image-results' src={`${process.env.ROOT_URL}images/misc/advanced.svg`} title='Advanced' />
                    </span>
                  )}
                </span>
                <ResultCryptClan value={card['Clan']} />
              </div>
              <div className="d-flex flex-nowrap">
                <ResultCryptDisciplines value={card['Disciplines']} />
              </div>
            </div>
          )
        }}
      />
      {cryptCardsList}
    </>
  );
}

export default TwdSearchFormCrypt;
