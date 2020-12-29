import React, { useState, useEffect, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Navigation from './pages/Navigation.jsx';
import defaultsTwdForm from './pages/components/defaultsTwdForm.js';
import defaultsCryptForm from './pages/components/defaultsCryptForm.js';
import defaultsLibraryForm from './pages/components/defaultsLibraryForm.js';
import './assets/css/bootstrap.min.css';
import './assets/css/style.styl';

const Crypt = lazy(() => import('./pages/Crypt.jsx'));
const Library = lazy(() => import('./pages/Library.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Twd = lazy(() => import('./pages/Twd.jsx'));
const Decks = lazy(() => import('./pages/Decks.jsx'));
const Account = lazy(() => import('./pages/Account.jsx'));

function App(props) {
  const [twdFormState, setTwdFormState] = useState(defaultsTwdForm);
  const [cryptFormState, setCryptFormState] = useState(defaultsCryptForm);
  const [libraryFormState, setLibraryFormState] = useState(defaultsLibraryForm);

  const [username, setUsername] = useState(undefined);
  const [publicName, setPublicName] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  const [showImage, setShowImage] = useState(true);
  const [addMode, setAddMode] = useState(false);
  const [showDeck, setShowDeck] = useState(true);

  const [decks, setDecks] = useState({});
  const [activeDeck, setActiveDeck] = useState(undefined);
  const [lastDeck, setLastDeck] = useState({});
  const [sharedDeck, setSharedDeck] = useState(undefined);

  const [twdResults, setTwdResults] = useState(undefined);
  const [twdCardBase, setTwdCardBase] = useState({});
  const [cryptResults, setCryptResults] = useState(undefined);
  const [libraryResults, setLibraryResults] = useState(undefined);

  const isMobile = window.matchMedia('(max-width: 540px)').matches;
  const isWide = window.matchMedia('(min-width: 1600px)').matches;

  const [showTwdSearch, setShowTwdSearch] = useState(true);
  const [showCryptSearch, setShowCryptSearch] = useState(true);
  const [showLibrarySearch, setShowLibrarySearch] = useState(true);

  const [changeTimer, setChangeTimer] = useState(false);
  const [timers, setTimers] = useState([]);

  const getDecks = () => {
    const url = `${process.env.API_URL}decks`;
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

  const deckCardAdd = (card, inDeck) => {
    if (!inDeck) {
      const url = `${process.env.API_URL}deck/${activeDeck}`;
      const options = {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cardAdd: { [card['Id']]: 1 } }),
      };

      const oldState = decks;

      fetch(url, options).catch((error) => {
        setDecks(oldState);
      });

      const part = card['Id'] > 200000 ? 'crypt' : 'library';
      setDecks((prevState) => ({
        ...prevState,
        [activeDeck]: {
          ...prevState[activeDeck],
          [part]: {
            ...prevState[activeDeck][part],
            [card['Id']]: {
              c: card,
              q: 1,
            },
          },
        },
      }));

      setChangeTimer(!changeTimer);
    } else {
      console.log('already in deck');
    }
  };

  const deckCardChange = (deckid, cardid, count) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cardChange: { [cardid]: count } }),
    };

    const oldState = decks;

    fetch(url, options).catch((error) => {
      setDecks(oldState);
    });

    const part = cardid > 200000 ? 'crypt' : 'library';

    if (count >= 0) {
      setDecks((prevState) => ({
        ...prevState,
        [deckid]: {
          ...prevState[deckid],
          [part]: {
            ...prevState[deckid][part],
            [cardid]: {
              ...prevState[deckid][part][cardid],
              q: count,
            },
          },
        },
      }));
    } else {
      setDecks((prevState) => {
        const oldState = { ...prevState };
        delete oldState[deckid][part][cardid];
        return oldState;
      });
    }

    const startTimer = () => {
      let counter = 1;
      timers.map((timerId) => {
        clearInterval(timerId);
      });
      setTimers([]);

      const timerId = setInterval(() => {
        if (counter > 0) {
          counter = counter - 1;
        } else {
          clearInterval(timerId);
          setChangeTimer(!changeTimer);
        }
      }, 500);

      setTimers([...timers, timerId]);
    };

    startTimer();
  };

  const whoAmI = () => {
    const url = `${process.env.API_URL}login`;
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
    const byTimestamp = (a, b) => {
      return new Date(b[1]) - new Date(a[1]);
    };

    const decksForSort = [];

    Object.keys(decks).map((key) => {
      decksForSort.push([decks[key], decks[key].timestamp]);
    });

    const lastDeckArray = decksForSort.sort(byTimestamp)[0];
    if (lastDeckArray) {
      setLastDeck(lastDeckArray[0]);
    }
  }, [decks]);

  useEffect(() => {
    whoAmI();
  }, []);

  useEffect(() => {
    if (username) {
      whoAmI();
      getDecks();
    } else {
      setDecks({});
    }
  }, [username]);

  useEffect(() => {
    if (lastDeck && !sharedDeck) {
      setActiveDeck(lastDeck.deckid);
    }
  }, [lastDeck]);

  // useEffect(() => {
  //   setChangeTimer(!changeTimer);
  // }, [decks[activeDeck] && decks[activeDeck]['Name']]);

  // useEffect(() => {
  //   setChangeTimer(!changeTimer);
  // }, [sharedDeck]);

  return (
    <div className="App">
      <Router>
        <Navigation
          isMobile={isMobile}
          showTwdSearch={showTwdSearch}
          setShowTwdSearch={setShowTwdSearch}
          showCryptSearch={showCryptSearch}
          setShowCryptSearch={setShowCryptSearch}
          showLibrarySearch={showLibrarySearch}
          setShowLibrarySearch={setShowLibrarySearch}
          username={username}
          decks={decks}
          activeDeck={activeDeck}
          setActiveDeck={setActiveDeck}
          isTwdResults={twdResults && true}
          isCryptResults={cryptResults && true}
          isLibraryResults={libraryResults && true}
          addMode={addMode}
          setAddMode={setAddMode}
          isActiveDeck={activeDeck ? true : false}
        />

        <Switch>
          <Suspense fallback={<></>}>
            <Route path="/" exact component={() => <Redirect to="/about" />} />
            <Route path="/about" exact component={() => <About />} />
            <Route path="/account">
              <Account
                isMobile={isMobile}
                username={username}
                publicName={publicName}
                email={email}
                setUsername={setUsername}
                setPublicName={setPublicName}
                setEmail={setEmail}
                whoAmI={whoAmI}
              />
            </Route>
            <Route path="/twd">
              <Twd
                isWide={isWide}
                isMobile={isMobile}
                showSearch={showTwdSearch}
                setShowSearch={setShowTwdSearch}
                getDecks={getDecks}
                showImage={showImage}
                setShowImage={setShowImage}
                results={twdResults}
                setResults={setTwdResults}
                cardBase={twdCardBase}
                setCardBase={setTwdCardBase}
                addMode={addMode}
                formState={twdFormState}
                setFormState={setTwdFormState}
              />
            </Route>
            <Route path="/decks">
              <Decks
                changeTimer={changeTimer}
                isMobile={isMobile}
                isWide={isWide}
                decks={decks}
                getDecks={getDecks}
                activeDeck={activeDeck}
                setActiveDeck={setActiveDeck}
                sharedDeck={sharedDeck}
                setSharedDeck={setSharedDeck}
                deckCardAdd={deckCardAdd}
                deckCardChange={deckCardChange}
                showImage={showImage}
                setShowImage={setShowImage}
                username={username}
                whoAmI={whoAmI}
                setUsername={setUsername}
              />
            </Route>
            <Route
              path="/decks/:id"
              component={(props) => (
                <Decks
                  changeTimer={changeTimer}
                  isMobile={isMobile}
                  isWide={isWide}
                  decks={decks}
                  getDecks={getDecks}
                  activeDeck={activeDeck}
                  setActiveDeck={setActiveDeck}
                  sharedDeck={sharedDeck}
                  setSharedDeck={setSharedDeck}
                  deckCardAdd={deckCardAdd}
                  deckCardChange={deckCardChange}
                  showImage={showImage}
                  username={username}
                  whoAmI={whoAmI}
                  setUsername={setUsername}
                  id={props.match.params.id}
                />
              )}
            />
            <Route path="/crypt">
              <Crypt
                changeTimer={changeTimer}
                isWide={isWide}
                isMobile={isMobile}
                showSearch={showCryptSearch}
                setShowSearch={setShowCryptSearch}
                showDeck={showDeck}
                setShowDeck={setShowDeck}
                deckCardAdd={deckCardAdd}
                deckCardChange={deckCardChange}
                decks={decks}
                getDecks={getDecks}
                activeDeck={activeDeck}
                setActiveDeck={setActiveDeck}
                showImage={showImage}
                setShowImage={setShowImage}
                results={cryptResults}
                setResults={setCryptResults}
                addMode={addMode}
                formState={cryptFormState}
                setFormState={setCryptFormState}
              />
            </Route>
            <Route path="/library">
              <Library
                changeTimer={changeTimer}
                isWide={isWide}
                isMobile={isMobile}
                showSearch={showLibrarySearch}
                setShowSearch={setShowLibrarySearch}
                showDeck={showDeck}
                setShowDeck={setShowDeck}
                deckCardAdd={deckCardAdd}
                deckCardChange={deckCardChange}
                decks={decks}
                getDecks={getDecks}
                activeDeck={activeDeck}
                setActiveDeck={setActiveDeck}
                showImage={showImage}
                setShowImage={setShowImage}
                results={libraryResults}
                setResults={setLibraryResults}
                addMode={addMode}
                formState={libraryFormState}
                setFormState={setLibraryFormState}
              />
            </Route>
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
