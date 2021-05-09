import React, { useContext } from 'react';
import reactStringReplace from 'react-string-replace';
import Hammer from '../../assets/images/icons/hammer.svg';
import icons from './forms_data/disciplineIcons.json';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultLayoutTextSets from './ResultLayoutTextSets.jsx';
import ResultLayoutTextRulings from './ResultLayoutTextRulings.jsx';
import AppContext from '../../context/AppContext.js';

function ResultCryptPopover(props) {
  const { localizedCrypt, lang } = useContext(AppContext);

  const imgSrc = `${process.env.ROOT_URL}images/cards/${
    localizedCrypt &&
    localizedCrypt[lang] &&
    localizedCrypt[lang][props.card['Id']]
      ? lang
      : 'en-EN'
  }/${props.card['ASCII Name']
    .toLowerCase()
    .replace(/[\s,:!?'".\-\(\)\/]/g, '')}${props.card['Adv'] && 'adv'}.jpg`;

  const cardImage = (
    <img
      className={props.fullWidth ? 'card-popover full-width' : 'card-popover'}
      src={imgSrc}
      alt={props.card['Name']}
      onClick={props.handleClose}
    />
  );

  const text = props.card['Card Text'].replace(/\(D\)/g, '\u24B9').split('\n');
  const iconizedText = [];
  text.map((i) => {
    iconizedText.push(
      reactStringReplace(i, /\[(\w+)\]/g, (match, idx) => (
        <img
          key={idx}
          className="discipline-base-image-results"
          src={`${process.env.ROOT_URL}images/disciplines/${icons[match]}.svg`}
          title={match}
        />
      ))
    );
  });

  return (
    <>
      {!props.showImage ? (
        <div className="py-1">
          <div className="d-flex flex-nowrap justify-content-between align-items-center">
            <div className="d-flex flex-nowrap align-items-center">
              <div>
                <ResultCryptClan value={props.card['Clan']} />
              </div>
              <div className="name pl-2">
                <b>{props.card['Name']}</b>
                {props.card['Banned'] && (
                  <span className="pl-1">
                    <Hammer />
                  </span>
                )}
                {props.card['Adv'] && (
                  <span className="pl-1">
                    <img
                      className="advanced-image-results"
                      src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
                      title="Advanced"
                    />
                  </span>
                )}
              </div>
            </div>
            <div className="pl-2">
              <ResultCryptGroup value={props.card['Group']} />
            </div>
          </div>
          <hr />
          {iconizedText.map((i, index) => {
            return (
              <React.Fragment key={index}>
                {i.map((y, idx) => {
                  return <React.Fragment key={idx}>{y}</React.Fragment>;
                })}
                <br />
              </React.Fragment>
            );
          })}
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <ResultCryptDisciplines value={props.card['Disciplines']} />
            <div className="popover-sets px-1">
              <ResultLayoutTextSets
                setImageSet={props.setImageSet}
                sets={props.card['Set']}
              />
            </div>
            <ResultCryptCapacity value={props.card['Capacity']} />
          </div>
          {Object.keys(props.card['Rulings']).length > 0 && (
            <>
              <div className="py-1">
                <b>Rulings: </b>
              </div>
              <div className="small pb-1">
                <ResultLayoutTextRulings rulings={props.card['Rulings']} />
              </div>
            </>
          )}
        </div>
      ) : (
        cardImage
      )}
    </>
  );
}

export default ResultCryptPopover;
