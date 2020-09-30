import React from 'react';

import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';

function DeckLibraryBody(props) {
  let resultTrClass = 'library-result-even';

  const cards = props.cards.map((card, index) => {
    if (resultTrClass == 'library-result-even') {
      resultTrClass = 'library-result-odd';
    } else {
      resultTrClass = 'library-result-even';
    }

    let DisciplineOrClan;
    if (card[0]['Clan']) {
      DisciplineOrClan = <ResultLibraryClan value={card[0]['Clan']} />;
    } else {
      DisciplineOrClan = (
        <ResultLibraryDisciplines value={card[0]['Discipline']} />
      );
    }

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          <td className="quantity">
            {props.isAuthor ? (
              <DeckCardQuantity
                cardid={card[0].Id}
                q={card[1]}
                deckid={props.deckid}
                deckCardChange={props.deckCardChange}
              />
            ) : card[1] ? (
              card[1]
            ) : null}
          </td>
          <td className="name">
            <ResultLibraryName
              id={card[0]['Id']}
              value={card[0]['Name']}
              ban={card[0]['Banned']}
              card={card[0]}
            />
          </td>
          <td className="cost">
            <ResultLibraryCost
              valueBlood={card[0]['Blood Cost']}
              valuePool={card[0]['Pool Cost']}
            />
          </td>
          <td className="discipline">{DisciplineOrClan}</td>
          <td className="burn">
            <ResultLibraryBurn value={card[0]['Burn Option']} />
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return <tbody>{cards}</tbody>;
}

function DeckLibraryByTypeTable(props) {
  return (
    <>
      <ResultLibraryType cardtype={props.cardtype} total={props.total} />
      <table className="deck-library-table">
        <DeckLibraryBody
          deckid={props.deckid}
          deckCardChange={props.deckCardChange}
          cards={props.cards}
          isAuthor={props.isAuthor}
        />
      </table>
    </>
  );
}

function DeckLibrary(props) {
  const library = {};
  const librarySide = {};

  Object.keys(props.cards).map((card, index) => {
    if (props.cards[card].q > 0) {
      library[card] = props.cards[card];
    } else {
      librarySide[card] = props.cards[card];
    }
  });

  const cardtypeSorted = [
    'Master',
    'Conviction',
    'Power',
    'Action',
    'Action/Reaction',
    'Action/Combat',
    'Political Action',
    'Ally',
    'Equipment',
    'Retainer',
    'Action Modifier',
    'Action Modifier/Combat',
    'Action Modifier/Reaction',
    'Reaction',
    'Reaction/Action Modifier',
    'Reaction/Combat',
    'Combat',
    'Combat/Action Modifier',
    'Combat/Reaction',
    'Event',
  ];

  const LibraryDeck = [];
  const LibrarySideDeck = [];
  let libraryTotal = 0;

  for (const card in library) {
    if (card) {
      libraryTotal += library[card].q;
      const cardtype = library[card].c['Type'];
      if (library[cardtype] === undefined) {
        library[cardtype] = [];
      }
      library[cardtype].push([library[card].c, library[card].q]);
    }
  }

  for (const card in librarySide) {
    if (card) {
      const cardtype = librarySide[card].c['Type'];
      if (librarySide[cardtype] === undefined) {
        librarySide[cardtype] = [];
      }
      librarySide[cardtype].push([librarySide[card].c, librarySide[card].q]);
    }
  }

  for (const cardtype of cardtypeSorted) {
    if (library[cardtype] !== undefined) {
      let total = 0;
      for (const card of library[cardtype]) {
        total += card[1];
      }
      LibraryDeck.push(
        <div key={cardtype}>
          <DeckLibraryByTypeTable
            deckCardChange={props.deckCardChange}
            deckid={props.deckid}
            cards={library[cardtype]}
            cardtype={cardtype}
            total={total}
            isAuthor={props.isAuthor}
          />
        </div>
      );
    }

    if (librarySide[cardtype] !== undefined) {
      let total = 0;
      for (const card of librarySide[cardtype]) {
        total += card[1];
      }
      LibrarySideDeck.push(
        <div key={cardtype}>
          <DeckLibraryByTypeTable
            deckCardChange={props.deckCardChange}
            deckid={props.deckid}
            cards={librarySide[cardtype]}
            cardtype={cardtype}
            total={total}
            isAuthor={props.isAuthor}
          />
        </div>
      );
    }
  }

  return (
    <>
      <div className="deck-library">
        <b>Library [{libraryTotal}]</b>
        {LibraryDeck}
      </div>
      {Object.keys(librarySide).length > 0 && (
        <div className="deck-sidelibrary">
          <b>Side Library:</b>
          {LibrarySideDeck}
        </div>
      )}
    </>
  );
}

export default DeckLibrary;
