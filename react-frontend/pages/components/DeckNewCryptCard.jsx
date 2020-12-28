import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import Hammer from '../../assets/images/icons/hammer.svg';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';

function DeckNewCryptCard(props) {
  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (value) => setSelectedValue(value);

  const addNewCard = () => {
    if (selectedValue.Id) {
      let inDeck;
      if (props.cards) {
        Object.keys(props.cards).map((i, index) => {
          if (i == selectedValue.Id) {
            inDeck = props.cards[i].q;
          }
        });
      }
      if (!inDeck) {
        props.deckCardAdd(selectedValue, inDeck);
      } else {
        console.log('already in deck');
      }
      setSelectedValue('');
      props.setShowAdd(false);
    } else {
      console.log('Error: submit with empty forms');
    }
  };

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
    if (selectedValue) addNewCard();
  }, [selectedValue]);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      autoFocus={true}
      value={selectedValue}
      placeholder="Add Crypt Card"
      loadOptions={loadOptions}
      onChange={handleChange}
      getOptionLabel={(card) => (
        <>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <ResultCryptCapacity value={card['Capacity']} />
              <span className="px-2">
                {card['Banned']
                 ? <>
                     <strike>
                       {card['Name']}
                     </strike>
                     {card['Adv'] && (
                       <span className="pl-1">
                         <img
                           className="advanced-image-results"
                           src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
                           title="Advanced"
                         />
                       </span>
                     )}
                     <span className="pl-1">
                       <Hammer />
                     </span>
                   </>
                 : <>
                     {card['Name']}
                     {card['Adv'] && (
                       <span className="pl-1">
                         <img
                           className="advanced-image-results"
                           src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
                           title="Advanced"
                         />
                       </span>
                     )}
                   </>
                }
              </span>
              <ResultCryptClan value={card['Clan']} />
            </div>
            <div className="d-flex flex-nowrap">
              <ResultCryptDisciplines value={card['Disciplines']} />
            </div>
          </div>
        </>
      )}
    />
  );
}

export default DeckNewCryptCard;
