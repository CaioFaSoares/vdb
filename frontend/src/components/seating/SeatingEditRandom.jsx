import React from 'react';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';
import { SeatingRandomDeck, SeatingCustomDeckAdd } from 'components';

const SeatingEditRandom = ({
  addCustomDeck,
  customDecks,
  removeCustomDeck,
  setWithCustom,
  setWithStandard,
  standardDecks,
  toggleCustom,
  toggleStandard,
  withCustom,
  withStandard,
}) => {
  return (
    <div className="space-y-4">
      <hr className="border-1 border-neutral-500" />
      <div className="space-y-2">
        <div
          className="flex items-center space-x-2"
          onClick={() => setWithCustom(!withCustom)}
        >
          {withCustom ? (
            <ToggleOn width="30" height="30" viewBox="0 0 16 16" />
          ) : (
            <ToggleOff width="30" height="30" viewBox="0 0 16 16" />
          )}
          <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Custom Decks</div>
        </div>
        <SeatingCustomDeckAdd addDeck={addCustomDeck} />
        <div className="flex">
          <div className="w-full md:w-1/2 lg:w-1/3">
            {customDecks
              .slice(0, Math.ceil(customDecks.length / 3))
              .map((d, idx) => {
                return (
                  <SeatingRandomDeck
                    key={idx}
                    i={idx}
                    deck={d}
                    toggle={toggleCustom}
                    disabled={!withCustom}
                    remove={removeCustomDeck}
                  />
                );
              })}
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            {customDecks
              .slice(
                Math.ceil(customDecks.length / 3),
                Math.ceil((customDecks.length * 2) / 3)
              )
              .map((d, idx) => {
                return (
                  <SeatingRandomDeck
                    key={idx}
                    i={Math.ceil(customDecks.length / 3) + idx}
                    deck={d}
                    toggle={toggleCustom}
                    disabled={!withCustom}
                    remove={removeCustomDeck}
                  />
                );
              })}
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            {customDecks
              .slice(Math.ceil((customDecks.length * 2) / 3))
              .map((d, idx) => {
                return (
                  <SeatingRandomDeck
                    key={idx}
                    i={Math.ceil((customDecks.length * 2) / 3) + idx}
                    deck={d}
                    toggle={toggleCustom}
                    disabled={!withCustom}
                    remove={removeCustomDeck}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <hr className="border-1 border-neutral-500" />
      <div className="space-y-2">
        <div
          className="flex items-center space-x-2"
          onClick={() => setWithStandard(!withStandard)}
        >
          {withStandard ? (
            <ToggleOn width="30" height="30" viewBox="0 0 16 16" />
          ) : (
            <ToggleOff width="30" height="30" viewBox="0 0 16 16" />
          )}
          <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">
            Standard Decks (from{' '}
            <a
              className="name"
              target="_blank"
              rel="noreferrer"
              href="https://codex-of-the-damned.org/en/archetypes/index.html"
            >
              Codex
            </a>
            )
          </div>
        </div>
        <div className="flex">
          <div className="w-full md:w-1/2 lg:w-1/3">
            {standardDecks
              .slice(0, Math.ceil(standardDecks.length / 3))
              .map((d, idx) => {
                return (
                  <SeatingRandomDeck
                    key={idx}
                    i={idx}
                    deck={d}
                    toggle={toggleStandard}
                    disabled={!withStandard}
                  />
                );
              })}
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            {standardDecks
              .slice(
                Math.ceil(standardDecks.length / 3),
                Math.ceil((standardDecks.length * 2) / 3)
              )
              .map((d, idx) => {
                return (
                  <SeatingRandomDeck
                    key={idx}
                    i={Math.ceil(standardDecks.length / 3) + idx}
                    deck={d}
                    toggle={toggleStandard}
                    disabled={!withStandard}
                  />
                );
              })}
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            {standardDecks
              .slice(Math.ceil((standardDecks.length * 2) / 3))
              .map((d, idx) => {
                return (
                  <SeatingRandomDeck
                    key={idx}
                    i={Math.ceil((standardDecks.length * 2) / 3) + idx}
                    deck={d}
                    toggle={toggleStandard}
                    disabled={!withStandard}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatingEditRandom;
