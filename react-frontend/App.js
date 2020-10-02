import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './assets/css/bootstrap.min.css';
import './assets/css/style.styl';

import Navigation from './pages/Navigation.jsx';
import Account from './pages/Account.jsx';
import About from './pages/About.jsx';
import Deck from './pages/Deck.jsx';
import Crypt from './pages/Crypt.jsx';
import Library from './pages/Library.jsx';

function App(props) {
  const [username, setUsername] = useState(undefined);
  const [publicName, setPublicName] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  const [showImage, setShowImage] = useState(false);
  const toggleImage = () => setShowImage(!showImage);

  const [decks, setDecks] = useState({});
  const [activeDeck, setActiveDeck] = useState(undefined);

  const getDecks = () => {
    const url = process.env.API_URL + 'decks';
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          if (JSON.stringify(data) != JSON.stringify(decks)) {
            setDecks(data);
          }
        } else {
          console.log('Error: ', data.error);
        }
      });
  };

  const deckCardAdd = (cardid) => {
    const url = process.env.API_URL + 'deck/' + activeDeck;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ add: { [cardid]: 1 } }),
    };

    fetch(url, options).then(() => getDecks());
  };

  const deckCardChange = (deckid, cardid, count) => {
    const url = process.env.API_URL + 'deck/' + deckid;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ update: { [cardid]: count } }),
    };

    fetch(url, options).then(() => getDecks());
  };

  const whoAmI = () => {
    const url = process.env.API_URL + 'login';
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setUsername(data.username);
        setPublicName(data.public_name);
        setEmail(data.email);
      });
  };

  useEffect(() => {
    whoAmI();
  }, []);

  useEffect(() => {
    if (username) {
      getDecks();
      whoAmI();
    } else {
      setDecks({});
    }
  }, [username]);

  return (
    <div className="App">
      <Router>
        <Navigation username={username} />
        <Switch>
          <Route path="/" exact component={() => <About />} />
          <Route path="/about" exact component={() => <About />} />
          <Route
            path="/account"
            exact
            component={() => (
              <Account
                username={username}
                publicName={publicName}
                email={email}
                setUsername={setUsername}
                setPublicName={setPublicName}
                setEmail={setEmail}
              />
            )}
          />
          <Route
            path="/deck"
            exact
            component={() => (
              <Deck
                decks={decks}
                getDecks={getDecks}
                activeDeck={activeDeck}
                setActiveDeck={setActiveDeck}
                deckCardAdd={deckCardAdd}
                deckCardChange={deckCardChange}
                showImage={showImage}
                toggleImage={toggleImage}
                username={username}
                whoAmI={whoAmI}
              />
            )}
          />
          <Route
            path="/deck/:id"
            component={(props) => (
              <Deck
                decks={decks}
                getDecks={getDecks}
                activeDeck={activeDeck}
                setActiveDeck={setActiveDeck}
                deckCardAdd={deckCardAdd}
                deckCardChange={deckCardChange}
                showImage={showImage}
                toggleImage={toggleImage}
                username={username}
                whoAmI={whoAmI}
                id={props.match.params.id}
              />
            )}
          />
          <Route path="/crypt">
            <Crypt
              deckCardAdd={deckCardAdd}
              deckCardChange={deckCardChange}
              decks={decks}
              getDecks={getDecks}
              activeDeck={activeDeck}
              setActiveDeck={setActiveDeck}
              showImage={showImage}
              toggleImage={toggleImage}
            />
          </Route>
          <Route path="/library">
            <Library
              deckCardAdd={deckCardAdd}
              deckCardChange={deckCardChange}
              decks={decks}
              getDecks={getDecks}
              activeDeck={activeDeck}
              setActiveDeck={setActiveDeck}
              showImage={showImage}
              toggleImage={toggleImage}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
