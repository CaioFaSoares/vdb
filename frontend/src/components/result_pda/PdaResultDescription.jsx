import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Stack } from 'react-bootstrap';
import CalendarEvent from 'assets/images/icons/calendar-event.svg';
import PersonFill from 'assets/images/icons/person-fill.svg';
import TagFill from 'assets/images/icons/tag-fill.svg';
import {
  TwdResultTags,
  PdaFavoriteButton,
  TwdOpenDeckButton,
  DeckCloneButton,
} from 'components';
import { useApp, useSearchForms } from 'context';
import { useTags } from 'hooks';
import defaults from 'components/forms_data/defaultsPdaForm.json';

const PdaResultDescription = ({ deck }) => {
  const { username, isMobile, isDesktop } = useApp();
  const { setPdaFormState } = useSearchForms();
  const tags = useTags(deck.crypt, deck.library);
  const navigate = useNavigate();
  const def = JSON.parse(JSON.stringify(defaults));

  const handleAuthorClick = (author) => {
    setPdaFormState({ ...def, author: author });
    navigate(
      `/pda?q=${encodeURIComponent(JSON.stringify({ author: author }))}`
    );
  };
  const lastUpdated = new Date(deck['timestamp']).toISOString().slice(0, 10);

  const Description = (
    <>
      <table>
        <tbody>
          <tr>
            <td className="blue">
              {isMobile ?
               <div className="d-flex align-items-center"><TagFill /></div>
               :
               <b>Deck:</b>
              }
            </td>
            <td className="ps-2">{deck['name']}</td>
          </tr>
          <tr>
            <td className="blue">
              {isMobile ?
               <div className="d-flex align-items-center"><PersonFill /></div>
               :
               <b>Author:</b>
              }
            </td>
            <td className="ps-2">
              <div
                className="link-like"
                onClick={() => handleAuthorClick(deck['author'])}
              >
                {deck['author']} <br />
              </div>
            </td>
          </tr>
          <tr>
            <td className="blue">
              {isMobile ?
               <div className="d-flex align-items-center"><CalendarEvent /></div>
               :
               <b>Created:</b>
              }
            </td>
            <td className="ps-2">{deck['creation_date']}</td>
          </tr>
          {lastUpdated !== deck['creation_date'] && (
            <tr>
              <td className="blue">
                {isMobile ?
                 <div className="d-flex align-items-center"><CalendarEvent /></div>
                 :
                 <b>Updated:</b>
                }
              </td>
              <td className="ps-2">{lastUpdated}</td>
            </tr>
          )}
        </tbody>
      </table>
      {(tags.superior.length > 0 || tags.base.length > 0) && (
        <TwdResultTags tags={tags} />
      )}
    </>
  );

  const Buttons = (
    <Stack gap={1}>
      <TwdOpenDeckButton deckid={deck['deckid']} inPda />
      {username && <DeckCloneButton deck={deck} src="pda" inPda />}
      <div>
        <PdaFavoriteButton deck={deck} />
      </div>
    </Stack>
  );

  return (
    <>
      {isDesktop ? (
        <>
          <div className="pb-2">{Description}</div>
          {Buttons}
        </>
      ) : (
        <Row className="pb-1 mx-0">
          <Col xs={9} className="px-1 mx-0">
            {Description}
          </Col>
          <Col xs={3} className="px-1">
            {Buttons}
          </Col>
        </Row>
      )}
    </>
  );
};

export default PdaResultDescription;
