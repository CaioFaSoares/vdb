import React, { useState } from 'react';

import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import DeckCardQuantity from './DeckCardQuantity.jsx';

function DeckCryptSideBody(props) {
  const SortByCapacity = (a, b) => {
    if (a.c['Capacity'] > b.c['Capacity']) {
      return -1;
    } else {
      return 1;
    }
  };
  const sorted_cards = Object.values(props.cards).sort(SortByCapacity);


  const [hiddenState, setHiddenState] = useState({});
  const toggleHidden = id => {
    if (hiddenState[id] == undefined || hiddenState[id] == true) {
      setHiddenState(prevState => ({
        ...prevState,
        [id]: false
      }));
    } else {
      setHiddenState(prevState => ({
        ...prevState,
        [id]: true
      }));
    }
  };

  let resultTrClass;

  const cards = sorted_cards.map((card, index) => {
    if (resultTrClass == 'crypt-result-odd') {
      resultTrClass = 'crypt-result-even';
    } else {
      resultTrClass = 'crypt-result-odd';
    }

    const sets = Object.keys(card.c['Set']).map((k, index) => {
      return(
        <div className='sets' key={index}>
          {k}: {card.c['Set'][k]}
        </div>
      );
    });

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          <DeckCardQuantity cardid={card.c['Id']} q={card.q} deckid={props.deckid} deckCardChange={props.deckCardChange} />
          <ResultCryptCapacity value={card.c['Capacity']} />
          <ResultCryptDisciplines disciplines_set={props.disciplines_set} value={card.c['Disciplines']} />
          <ResultCryptName id={card.c['Id']} toggleHidden={toggleHidden} value={card.c['Name']} adv={card.c['Adv']} ban={card.c['Banned']}/>
          <ResultCryptClan value={card.c['Clan']} />
          <ResultCryptGroup value={card.c['Group']} />
        </tr>
        { hiddenState[card.c['Id']] == undefined || hiddenState[card.c['Id']] == true ? (
          null
        ) : (
          <tr className={resultTrClass}>
            <td colSpan={3}>
            </td>
            <td colSpan={2} className='text'>
              <div onClick={() => toggleHidden()}className='text'>
                {card.c['Card Text']}
              </div>
            </td>
            <td colSpan={1} className='set'>
              <div>
                {sets}
              </div>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  });
  return <tbody>{cards}</tbody>;
}

function DeckCryptBody(props) {
  const SortByQuantity = (a, b) => {
    if (a.q > b.q) {
      return -1;
    } else {
      return 1;
    }
  };

  const sorted_cards = Object.values(props.cards).sort(SortByQuantity);
  let resultTrClass;

  const [hiddenState, setHiddenState] = useState({});

  const toggleHidden = id => {
    if (hiddenState[id] == undefined || hiddenState[id] == true) {
      setHiddenState(prevState => ({
        ...prevState,
        [id]: false
      }));
    } else {
      setHiddenState(prevState => ({
        ...prevState,
        [id]: true
      }));
    }
  };

  const cards = sorted_cards.map((card, index) => {
    if (resultTrClass == 'crypt-result-odd') {
      resultTrClass = 'crypt-result-even';
    } else {
      resultTrClass = 'crypt-result-odd';
    }

    const sets = Object.keys(card.c['Set']).map((k, index) => {
      return(
        <div className='sets' key={index}>
          {k}: {card.c['Set'][k]}
        </div>
      );
    });

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          <DeckCardQuantity cardid={card.c['Id']} q={card.q} deckid={props.deckid} deckCardChange={props.deckCardChange} />
          <ResultCryptCapacity value={card.c['Capacity']} />
          <ResultCryptDisciplines disciplines_set={props.disciplines_set} value={card.c['Disciplines']} />
          <ResultCryptName id={card.c['Id']} toggleHidden={toggleHidden} value={card.c['Name']} />
          <ResultCryptClan value={card.c['Clan']} />
          <ResultCryptGroup value={card.c['Group']} />
        </tr>
        { hiddenState[card.c['Id']] == undefined || hiddenState[card.c['Id']] == true ? (
          null
        ) : (
          <tr className={resultTrClass}>
            <td colSpan={3}>
            </td>
            <td colSpan={2} className='text'>
              <div onClick={() => toggleHidden()} className='text'>
                {card.c['Card Text']}
              </div>
            </td>
            <td colSpan={1} className='set'>
              <div>
                {sets}
              </div>
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  });
  return <tbody>{cards}</tbody>;
}

function DeckCrypt(props) {
  let d_set = new Set();
  for (const card of Object.keys(props.cards)) {
    for (const d of Object.keys(props.cards[card].c['Disciplines'])) {
      d_set.add(d);
    };
  };
  const disciplines_set = [...d_set].sort();

  const crypt = {};
  const crypt_side = {};

  let crypt_group_min;
  let crypt_group_max;

  Object.keys(props.cards).map((card, index) => {
    if (props.cards[card].q > 0) {
      crypt[card] = props.cards[card];
    } else {
      crypt_side[card] = props.cards[card];
    }

    if (props.cards[card].c['Group'] < crypt_group_min || crypt_group_min == undefined) {
      crypt_group_min = props.cards[card].c['Group'];
    }
    if (props.cards[card].c['Group'] > crypt_group_max || crypt_group_max == undefined) {
      crypt_group_max = props.cards[card].c['Group'];
    }
  });

  let crypt_total = 0;
  for (const card in crypt) {
    crypt_total += crypt[card].q;
  }

  let crypt_groups;
  if (crypt_group_max - crypt_group_min == 1) {
    crypt_groups = 'G' + crypt_group_min + '-' + crypt_group_max;
  } else if (crypt_group_max - crypt_group_min == 0) {
    crypt_groups = 'G' + crypt_group_max;
  } else {
    crypt_groups = 'ERROR IN GROUPS';
  }

  return (
    <div>
      <div className='deck-crypt'>
        <b>Crypt [{crypt_total}] - {crypt_groups}:</b>
        <table className='deck-crypt-table'>
          <DeckCryptBody deckid={props.deckid} deckCardChange={props.deckCardChange} cards={crypt} disciplines_set={disciplines_set} />
        </table>
      </div>
      { Object.keys(crypt_side).length > 0 &&
        <div className='deck-sidecrypt'>
          <br />
          <b>Side Crypt</b>
          <table className='deck-crypt-table'>
            <DeckCryptSideBody deckid={props.deckid} deckCardChange={props.deckCardChange} cards={crypt_side} disciplines_set={disciplines_set}/>
          </table>
        </div>
      }
    </div>
  );
}

export default DeckCrypt;
