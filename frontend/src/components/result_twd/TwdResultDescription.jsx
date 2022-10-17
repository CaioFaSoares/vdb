import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Stack } from 'react-bootstrap';
import CalendarEvent from 'assets/images/icons/calendar-event.svg';
import GeoAltFill from 'assets/images/icons/geo-alt-fill.svg';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import PersonFill from 'assets/images/icons/person-fill.svg';
import TagFill from 'assets/images/icons/tag-fill.svg';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import { TwdResultTags, TwdOpenDeckButton, DeckCloneButton } from 'components';
import { useApp, useSearchForms } from 'context';
import { useTags } from 'hooks';
import defaults from 'components/forms_data/defaultsTwdForm.json';

const TwdResultDescription = ({ deck }) => {
  const { username, isMobile, isDesktop } = useApp();
  const { setTwdFormState } = useSearchForms();
  const tags = useTags(deck.crypt, deck.library);
  const navigate = useNavigate();
  const def = JSON.parse(JSON.stringify(defaults));

  const handleAuthorClick = (author) => {
    setTwdFormState({ ...def, author: author });
    navigate(
      `/twd?q=${encodeURIComponent(JSON.stringify({ author: author }))}`
    );
  };

  const handleLocationClick = (location) => {
    setTwdFormState({ ...def, location: location });
    navigate(
      `/twd?q=${encodeURIComponent(JSON.stringify({ location: location }))}`
    );
  };

  const Description = (
    <>
      <table>
        <tbody>
          <tr>
            <td className="blue">
              {isMobile ?
               <div className="d-flex align-items-center"><CalendarEvent /></div>
               :
               <b>Date:</b>
              }
            </td>
            <td className="ps-2">{deck['creation_date']}</td>
          </tr>
          <tr>
            <td className="blue">
              {isMobile ?
               <div className="d-flex align-items-center"><TrophyFill /></div>
               :
               <b>Event:</b>
              }
            </td>
            <td className="ps-2">{deck['event']}</td>
          </tr>
          <tr>
            <td className="blue">
              {isMobile ?
               <div className="d-flex align-items-center"><GeoAltFill /></div>
               :
               <b>Location:</b>
              }
            </td>
            <td className="ps-2">
              <div
                className="link-like"
                onClick={() => handleLocationClick(deck['location'])}
              >
                {deck['location']}
              </div>
            </td>
          </tr>
          <tr>
            <td className="blue">
              {isMobile ?
               <div className="d-flex align-items-center"><PersonFill /></div>
               :
               <b>Player:</b>
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
               <div className="d-flex align-items-center"><TagFill /></div>
               :
               <b>Deck:</b>
              }
            </td>
            <td className="ps-2">{deck['name']}</td>
          </tr>
        </tbody>
      </table>
      {(tags.superior.length > 0 || tags.base.length > 0) && (
        <TwdResultTags tags={tags} />
      )}
    </>
  );

  return (
    <>
      {isDesktop ? (
        <>
          <div
            className={`d-flex justify-content-center align-items-center large mx-1 mt-1 mb-2 blue ${
              deck['players'] >= 30
                ? 'bold border-dashed-thick'
                : 'border-dashed'
            }`}
            title="Players"
          >
            <div className="d-flex align-items-center pe-1">
              <PeopleFill />
            </div>{' '}
            {deck['players']}
          </div>
          {Description}
          <Stack gap={1} className="py-2">
            <TwdOpenDeckButton deckid={deck['deckid']} />
            {username && <DeckCloneButton deck={deck} src="twd" inTwd />}
          </Stack>
        </>
      ) : (
        <Row className="pb-1 mx-0">
          <Col xs={9} className="px-1 mx-0">
            {Description}
          </Col>
          <Col xs={3} className="px-1">
            <Stack gap={1}>
              <div
                className={`d-flex justify-content-center align-items-center large mx-1 mb-1 blue ${
                  deck['players'] >= 30
                    ? 'bold border-dashed-thick'
                    : 'border-dashed'
                }`}
              >
                <div className="d-flex align-items-center pe-1">
                  <PeopleFill />
                </div>{' '}
                {deck['players']}
              </div>
              <TwdOpenDeckButton deckid={deck['deckid']} />
              {username && <DeckCloneButton deck={deck} src="twd" inTwd />}
            </Stack>
          </Col>
        </Row>
      )}
    </>
  );
};

export default TwdResultDescription;
