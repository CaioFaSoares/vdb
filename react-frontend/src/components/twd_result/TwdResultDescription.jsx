import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Stack } from 'react-bootstrap';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import { TwdOpenDeckButton, DeckCloneButton } from 'components';
import { useApp, useSearchForms } from 'context';
import defaults from 'components/forms_data/defaultsTwdForm.json';

function TwdResultDescription(props) {
  const { username, isMobile } = useApp();
  const { setTwdFormState } = useSearchForms();

  const navigate = useNavigate();
  const def = JSON.parse(JSON.stringify(defaults));

  const handleAuthorClick = (author) => {
    setTwdFormState((prevState) => ({
      ...def,
      author: author,
    }));
    navigate(
      `/twd?q=${encodeURIComponent(JSON.stringify({ author: author }))}`
    );
  };

  const handleLocationClick = (location) => {
    setTwdFormState((prevState) => ({
      ...def,
      location: location,
    }));
    navigate(
      `/twd?q=${encodeURIComponent(JSON.stringify({ location: location }))}`
    );
  };

  const Description = (
    <table>
      <tbody>
        <tr>
          <td className="d-inline blue">
            <b>Date:</b>
          </td>
          <td className="ps-2">{props.deck['creation_date']}</td>
        </tr>
        {!isMobile && (
          <tr>
            <td className="d-inline blue">
              <b>Players</b>:
            </td>
            <td className="ps-2">{props.deck['players']}</td>
          </tr>
        )}
        <tr>
          <td className="d-inline blue">
            <b>Event</b>:
          </td>
          <td className="ps-2">{props.deck['event']}</td>
        </tr>
        <tr>
          <td className="d-inline blue">
            <b>Location</b>:
          </td>
          <td className="ps-2">
            <div
              className="link-like"
              onClick={() => handleLocationClick(props.deck['location'])}
            >
              {props.deck['location']}
            </div>
          </td>
        </tr>
        <tr>
          <td className="d-inline blue">
            <b>Player</b>:
          </td>
          <td className="ps-2">
            <div
              className="link-like"
              onClick={() => handleAuthorClick(props.deck['author'])}
            >
              {props.deck['author']} <br />
            </div>
          </td>
        </tr>
        {!isMobile && (
          <tr>
            <td className="d-inline blue">
              <b>Deck</b>:
            </td>
            <td className="ps-2">{props.deck['name']}</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <>
      {isMobile ? (
        <Row className="pb-1 mx-0">
          <Col xs={9} className="px-1 mx-0">
            {Description}
          </Col>
          <Col xs={3} className="px-1">
            <Stack gap={1}>
              {isMobile && (
                <div className="d-flex justify-content-center align-items-center large mx-1 mb-1 border-dashed blue">
                  <div className="d-flex align-items-center pe-1">
                    <PeopleFill />
                  </div>{' '}
                  {props.deck['players']}
                </div>
              )}
              <TwdOpenDeckButton deckid={props.deck['deckid']} />
              {username && (
                <DeckCloneButton
                  deck={props.deck}
                  activeDeck={{ src: 'twd', deckid: props.deck.deckid }}
                  setShowButtons={() => {}}
                  inTwd
                />
              )}
            </Stack>
          </Col>
        </Row>
      ) : (
        <>
          {Description}
          <Stack gap={1} className="py-2">
            <TwdOpenDeckButton deckid={props.deck['deckid']} />
            {username && (
              <DeckCloneButton
                deck={props.deck}
                activeDeck={{ src: 'twd', deckid: props.deck.deckid }}
                inTwd
              />
            )}
          </Stack>
        </>
      )}
    </>
  );
}

export default TwdResultDescription;
