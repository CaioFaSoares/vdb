import React from 'react';
import NodePlusFill from 'assets/images/icons/node-plus-fill.svg';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const DeckBranchCreateButton = (props) => {
  const { setDecks, setActiveDeck, isMobile } = useApp();

  const branchCreate = () => {
    const url = `${process.env.API_URL}branch/create`;
    const master = props.deck.master ? props.deck.master : props.deck.deckid;

    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        master: master,
        source: props.deck.deckid,
      }),
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        const now = new Date();
        setDecks((prevState) => ({
          ...prevState,
          [master]: {
            ...prevState[master],
            branches: prevState[master].branches
              ? [...prevState[master].branches, data.deckid]
              : [data.deckid],
          },
          [data.deckid]: {
            ...props.deck,
            deckid: data.deckid,
            crypt: { ...props.deck.crypt },
            library: { ...props.deck.library },
            master: master,
            branchName: data.branch_name,
            timestamp: now.toUTCString(),
          },
        }));
        setActiveDeck({ src: 'my', deckid: data.deckid });
        isMobile && props.setShowButtons(false);
      });
  };

  return (
    <ButtonIconed
      variant="secondary"
      onClick={branchCreate}
      title="Create New Revision of the Deck"
      icon={<NodePlusFill width="21" height="21" viewBox="0 0 16 16" />}
      text="New Revision"
    />
  );
};

export default DeckBranchCreateButton;
