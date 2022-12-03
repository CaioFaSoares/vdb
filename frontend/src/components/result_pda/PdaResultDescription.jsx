import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Stack } from 'react-bootstrap';
import CalendarEvent from 'assets/images/icons/calendar-event.svg';
import PersonFill from 'assets/images/icons/person-fill.svg';
import TagFill from 'assets/images/icons/tag-fill.svg';
import {
  TwdResultTags,
  PdaFavoriteButton,
  TwdOpenDeckButton,
  DeckCloneButton,
} from 'components';
import { useApp, clearSearchForm, searchPdaForm } from 'context';
import { useTags } from 'hooks';

const PdaResultDescription = ({ deck }) => {
  const { username, isMobile, isDesktop } = useApp();
  const tags = useTags(deck.crypt, deck.library);
  const navigate = useNavigate();

  const handleClick = (author) => {
    clearSearchForm('pda');
    searchPdaForm.author = author;
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
              {isMobile ? (
                <div className="flex items-center">
                  <TagFill />
                </div>
              ) : (
                <b>Deck:</b>
              )}
            </td>
            <td className="ps-2">{deck['name']}</td>
          </tr>
          <tr>
            <td className="blue">
              {isMobile ? (
                <div className="flex items-center">
                  <PersonFill />
                </div>
              ) : (
                <b>Author:</b>
              )}
            </td>
            <td className="ps-2">
              <div
                className="link-like"
                onClick={() => handleClick(deck['author'])}
              >
                {deck['author']} <br />
              </div>
            </td>
          </tr>
          <tr>
            <td className="blue">
              {isMobile ? (
                <div className="flex items-center">
                  <CalendarEvent />
                </div>
              ) : (
                <b>Created:</b>
              )}
            </td>
            <td className="ps-2">{deck['creation_date']}</td>
          </tr>
          {lastUpdated !== deck['creation_date'] && (
            <tr>
              <td className="blue">
                {isMobile ? (
                  <div className="flex items-center">
                    <CalendarEvent />
                  </div>
                ) : (
                  <b>Updated:</b>
                )}
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

  return (
    <>
      {isDesktop ? (
        <>
          {Description}
          <div className="flex flex-row p-2">
            <div className="md:basis-1/2 ps-2 pe-1">
              <TwdOpenDeckButton deckid={deck['deckid']} />
            </div>
            <div className="md:basis-1/2 ps-1 pe-2">
              {username && <DeckCloneButton deck={deck} noRedirect />}
            </div>
            <div className="p-2">
              <PdaFavoriteButton deck={deck} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-row pb-1 mx-0">
          <div className="xs={9} px-1 mx-0">
            {Description}
          </div>
          <div className="basis-1/4 px-1">
            <Stack gap={1}>
              <TwdOpenDeckButton deckid={deck['deckid']} />
              {username && <DeckCloneButton deck={deck} noRedirect />}
              <div>
                <PdaFavoriteButton deck={deck} />
              </div>
            </Stack>
          </div>
        </div>
      )}
    </>
  );
};

export default PdaResultDescription;
