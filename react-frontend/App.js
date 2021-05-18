import React, { useState, useEffect, useContext, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.js';
import AppContext from './context/AppContext';
import Navigation from './pages/Navigation.jsx';
import preconDecksData from './preconDecks.json';
import preconData from './pages/components/forms_data/preconOptions.json';
import setsAndPrecons from './pages/components/forms_data/setsAndPrecons.json';
import './assets/css/bootstrap.min.css';
import './assets/css/style.styl';

const Crypt = lazy(() => import('./pages/Crypt.jsx'));
const Library = lazy(() => import('./pages/Library.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Documentation = lazy(() => import('./pages/Documentation.jsx'));
const Twd = lazy(() => import('./pages/Twd.jsx'));
const Decks = lazy(() => import('./pages/Decks.jsx'));
const Account = lazy(() => import('./pages/Account.jsx'));
const Cards = lazy(() => import('./pages/Cards.jsx'));
const Inventory = lazy(() => import('./pages/Inventory.jsx'));

function App(props) {
  const {
    isMobile,
    username,
    setUsername,
    setPublicName,
    setEmail,
    lang,
    changeLang,
    localizedCrypt,
    setLocalizedCrypt,
    localizedLibrary,
    setLocalizedLibrary,
    nativeCrypt,
    setNativeCrypt,
    nativeLibrary,
    setNativeLibrary,
    setAddMode,
    cryptCardBase,
    setCryptCardBase,
    libraryCardBase,
    setLibraryCardBase,
    setUsedCryptCards,
    setUsedLibraryCards,
    inventoryCrypt,
    setInventoryCrypt,
    inventoryLibrary,
    setInventoryLibrary,
    decks,
    setDecks,
    activeDeck,
    setActiveDeck,
    sharedDeck,
    setSharedDeck,
    getDecks,
    preconDecks,
    setPreconDecks,
  } = useContext(AppContext);

  const [lastDeck, setLastDeck] = useState({});
  const [changeTimer, setChangeTimer] = useState(false);
  const [timers, setTimers] = useState([]);

  const getCardBase = () => {
    const urlCrypt = `${process.env.ROOT_URL}cardbase_crypt.json`;
    const urlLibrary = `${process.env.ROOT_URL}cardbase_lib.json`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(urlCrypt, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          setCryptCardBase(data);
          const en = {};
          Object.keys(data).map((id) => {
            en[id] = {
              Name: data[id]['Name'],
              'Card Text': data[id]['Card Text'],
            };
          });
          setNativeCrypt(en);
        }
      });

    fetch(urlLibrary, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          setLibraryCardBase(data);
          const en = {};
          Object.keys(data).map((id) => {
            en[id] = {
              Name: data[id]['Name'],
              'Card Text': data[id]['Card Text'],
            };
          });
          setNativeLibrary(en);
        }
      });
  };

  const getLocalization = (lang) => {
    const urlCrypt = `${process.env.ROOT_URL}cardbase_crypt.${lang}.json`;
    const urlLibrary = `${process.env.ROOT_URL}cardbase_lib.${lang}.json`;

    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(urlCrypt, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          setLocalizedCrypt((prevState) => ({
            ...prevState,
            [lang]: data,
          }));
        }
      });

    fetch(urlLibrary, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          setLocalizedLibrary((prevState) => ({
            ...prevState,
            [lang]: data,
          }));
        }
      });
  };

  const applyLocalization = (lang, part) => {
    const nativeSrc = part == 'crypt' ? nativeCrypt : nativeLibrary;
    const setState = part == 'crypt' ? setCryptCardBase : setLibraryCardBase;

    setState((prevState) => {
      const state = { ...prevState };
      Object.keys(nativeSrc).map((k) => {
        state[k]['Name'] = nativeSrc[k]['Name'];
        state[k]['Card Text'] = nativeSrc[k]['Card Text'];
      });

      if (lang != 'en-EN') {
        const localizedSrc =
          part == 'crypt' ? localizedCrypt[lang] : localizedLibrary[lang];

        Object.keys(localizedSrc).map((k) => {
          state[k]['Name'] = localizedSrc[k]['Name'];
          state[k]['Card Text'] = localizedSrc[k]['Card Text'];
        });
      }
      return state;
    });
  };

  const getInventory = () => {
    const url = `${process.env.API_URL}inventory`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          Object.keys(data.crypt).map((i) => {
            data.crypt[i].c = cryptCardBase[i];
          });
          Object.keys(data.library).map((i) => {
            data.library[i].c = libraryCardBase[i];
          });
          setInventoryCrypt(data.crypt);
          setInventoryLibrary(data.library);
        }
      });
  };

  const inventoryDeckAdd = (deck) => {
    const cards = {};

    Object.keys(deck.crypt).forEach((card) => {
      if (deck.crypt[card].q) {
        cards[card] = deck.crypt[card].q;
      }
    });

    Object.keys(deck.library).forEach((card) => {
      if (deck.library[card].q) {
        cards[card] = deck.library[card].q;
      }
    });

    const url = `${process.env.API_URL}inventory/add`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cards),
    };

    const oldCryptState = { ...inventoryCrypt };
    const oldLibraryState = { ...inventoryLibrary };
    fetch(url, options).catch((error) => {
      setInventoryCrypt(oldCryptState);
      setInventoryLibrary(oldLibraryState);
    });

    inventoryAddToState(cards);
  };

  const inventoryAddToState = (cards) => {
    Object.keys(cards).forEach((cardid) => {
      if (cardid > 200000) {
        setInventoryCrypt((prevState) => {
          const oldState = { ...prevState };
          oldState[cardid] = {
            c: cryptCardBase[cardid],
            q: prevState[cardid]
              ? prevState[cardid].q + cards[cardid]
              : cards[cardid],
          };
          return oldState;
        });
      } else {
        setInventoryLibrary((prevState) => {
          const oldState = { ...prevState };
          oldState[cardid] = {
            c: libraryCardBase[cardid],
            q: prevState[cardid]
              ? prevState[cardid].q + cards[cardid]
              : cards[cardid],
          };
          return oldState;
        });
      }
    });
  };

  const inventoryCardChange = (cardid, count) => {
    const url = `${process.env.API_URL}inventory/change`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [cardid]: count }),
    };

    if (cardid > 200000) {
      if (count >= 0 || (count < 0 && inventoryCrypt[cardid])) {
        const oldState = { ...inventoryCrypt };

        fetch(url, options).catch((error) => {
          setInventoryCrypt(oldState);
        });

        if (count >= 0) {
          setInventoryCrypt((prevState) => ({
            ...prevState,
            [cardid]: {
              c: cryptCardBase[cardid],
              q: count,
            },
          }));
        } else {
          setInventoryCrypt((prevState) => {
            const state = { ...prevState };
            delete state[cardid];
            return state;
          });
        }
      }
    } else {
      if (count >= 0 || (count < 0 && inventoryLibrary[cardid])) {
        const oldState = { ...inventoryLibrary };

        fetch(url, options).catch((error) => {
          setInventoryLibrary(oldState);
        });

        if (count >= 0) {
          setInventoryLibrary((prevState) => ({
            ...prevState,
            [cardid]: {
              c: libraryCardBase[cardid],
              q: count,
            },
          }));
        } else {
          setInventoryLibrary((prevState) => {
            const state = { ...prevState };
            delete state[cardid];
            return state;
          });
        }
      }
    }
  };

  const getPreconDecks = () => {
    const precons = {};

    Object.keys(preconDecksData).map((set) => {
      Object.keys(preconDecksData[set]).map((precon) => {
        const deckid = `${set}:${precon}`;
        const name = preconData.filter(
          (i) => i[1] == set && i[2] == precon
        )[0][3];

        precons[deckid] = {
          name: `${name}`,
          deckid: deckid,
          author: 'VTES Team',
          description: `Preconstructed from "${setsAndPrecons[set]['name']}" [${setsAndPrecons[set]['year']}]`,
          crypt: {},
          library: {},
        };
        Object.keys(preconDecksData[set][precon]).map((card) => {
          if (card > 200000) {
            precons[deckid]['crypt'][card] = {
              c: cryptCardBase[card],
              q: preconDecksData[set][precon][card],
            };
          } else {
            precons[deckid]['library'][card] = {
              c: libraryCardBase[card],
              q: preconDecksData[set][precon][card],
            };
          }
        });
      });
    });
    setPreconDecks(precons);
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

    const oldState = { ...decks };

    fetch(url, options).catch((error) => {
      setDecks(oldState);
    });

    if (count >= 0) {
      if (cardid > 200000) {
        setDecks((prevState) => {
          const oldState = { ...prevState };
          oldState[activeDeck.deckid]['crypt'][cardid] = {
            c: cryptCardBase[cardid],
            q: count,
          };
          return oldState;
        });
      } else {
        setDecks((prevState) => {
          const oldState = { ...prevState };
          oldState[activeDeck.deckid]['library'][cardid] = {
            c: libraryCardBase[cardid],
            q: count,
          };
          return oldState;
        });
      }
    } else {
      if (cardid > 200000) {
        setDecks((prevState) => {
          const oldState = { ...prevState };
          delete oldState[deckid]['crypt'][cardid];
          return oldState;
        });
      } else {
        setDecks((prevState) => {
          const oldState = { ...prevState };
          delete oldState[deckid]['library'][cardid];
          return oldState;
        });
      }
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
        data.username && setUsername(data.username);
        data.username && !isMobile && setAddMode(true);
        data.public_name && setPublicName(data.public_name);
        data.email && setEmail(data.email);
      });
  };

  useEffect(() => {
    const byTimestamp = (a, b) => {
      return new Date(b[1]) - new Date(a[1]);
    };

    if (decks) {
      const decksForSort = [];

      Object.keys(decks).map((key) => {
        decksForSort.push([decks[key], decks[key].timestamp]);
      });

      const lastDeckArray = decksForSort.sort(byTimestamp)[0];
      if (lastDeckArray) {
        setLastDeck(lastDeckArray[0]);
      }
    }
  }, [decks]);

  useEffect(() => {
    if (decks) {
      const softCrypt = {};
      const softLibrary = {};
      const hardCrypt = {};
      const hardLibrary = {};
      Object.keys(decks).forEach((deckid) => {
        if (decks[deckid].inventory_type == 's') {
          Object.keys(decks[deckid].crypt).forEach((id) => {
            if (decks[deckid].crypt[id].q) {
              if (softCrypt[id]) {
                softCrypt[id][deckid] = decks[deckid].crypt[id].q;
              } else {
                softCrypt[id] = {};
                softCrypt[id][deckid] = decks[deckid].crypt[id].q;
              }
            }
          });
          Object.keys(decks[deckid].library).forEach((id) => {
            if (decks[deckid].library[id].q) {
              if (softLibrary[id]) {
                softLibrary[id][deckid] = decks[deckid].library[id].q;
              } else {
                softLibrary[id] = {};
                softLibrary[id][deckid] = decks[deckid].library[id].q;
              }
            }
          });
        } else if (decks[deckid].inventory_type == 'h') {
          Object.keys(decks[deckid].crypt).forEach((id) => {
            if (decks[deckid].crypt[id].q) {
              if (hardCrypt[id]) {
                hardCrypt[id][deckid] = decks[deckid].crypt[id].q;
              } else {
                hardCrypt[id] = {};
                hardCrypt[id][deckid] = decks[deckid].crypt[id].q;
              }
            }
          });
          Object.keys(decks[deckid].library).forEach((id) => {
            if (decks[deckid].library[id].q) {
              if (hardLibrary[id]) {
              } else {
                hardLibrary[id] = {};
                hardLibrary[id][deckid] = decks[deckid].library[id].q;
              }
            }
          });
        }
        Object.keys(decks[deckid].crypt).forEach((id) => {
          if (decks[deckid].crypt[id].i == 's' && decks[deckid].crypt[id].q) {
            if (softCrypt[id]) {
              softCrypt[id][deckid] = decks[deckid].crypt[id].q;
            } else {
              softCrypt[id] = {};
              softCrypt[id][deckid] = decks[deckid].crypt[id].q;
            }
            delete hardCrypt[id][deckid];
          }
          if (decks[deckid].crypt[id].i == 'h' && decks[deckid].crypt[id].q) {
            if (hardCrypt[id]) {
              hardCrypt[id][deckid] = decks[deckid].crypt[id].q;
            } else {
              hardCrypt[id] = {};
              hardCrypt[id][deckid] = decks[deckid].crypt[id].q;
            }
            delete softCrypt[id][deckid];
          }
        });
        Object.keys(decks[deckid].library).forEach((id) => {
          if (
            decks[deckid].library[id].i == 's' &&
            decks[deckid].library[id].q
          ) {
            if (softLibrary[id]) {
              softLibrary[id][deckid] = decks[deckid].library[id].q;
            } else {
              softLibrary[id] = {};
              softLibrary[id][deckid] = decks[deckid].library[id].q;
            }
            delete hardLibrary[id][deckid];
          }
          if (
            decks[deckid].library[id].i == 'h' &&
            decks[deckid].library[id].q
          ) {
            if (hardLibrary[id]) {
              hardLibrary[id][deckid] = decks[deckid].library[id].q;
            } else {
              hardLibrary[id] = {};
              hardLibrary[id][deckid] = decks[deckid].library[id].q;
            }
            delete softLibrary[id][deckid];
          }
        });
      });
      setUsedCryptCards({
        soft: softCrypt,
        hard: hardCrypt,
      });
      setUsedLibraryCards({
        soft: softLibrary,
        hard: hardLibrary,
      });
    }
  }, [decks]);

  useEffect(() => {
    whoAmI();
    (!cryptCardBase || !libraryCardBase) && getCardBase();
  }, []);

  useEffect(() => {
    if (username) {
      whoAmI();
      cryptCardBase && libraryCardBase && getInventory();
      cryptCardBase && libraryCardBase && getDecks();
    } else {
      setDecks(undefined);
    }
    cryptCardBase && libraryCardBase && getPreconDecks();
  }, [username, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (lastDeck && lastDeck.deckid && !activeDeck.deckid) {
      setActiveDeck({ src: 'my', deckid: lastDeck.deckid });
    }
  }, [lastDeck]);

  useEffect(() => {
    if (lang == 'en-EN') {
      if (nativeCrypt) {
        applyLocalization(lang, 'crypt');
      }
    } else if (nativeCrypt && localizedCrypt && localizedCrypt[lang]) {
      applyLocalization(lang, 'crypt');
    }
  }, [lang, nativeCrypt, localizedCrypt]);

  useEffect(() => {
    if (lang == 'en-EN') {
      if (nativeLibrary) {
        applyLocalization(lang, 'library');
      }
    } else if (nativeLibrary && localizedLibrary && localizedLibrary[lang]) {
      applyLocalization(lang, 'library');
    }
  }, [lang, nativeLibrary, localizedLibrary]);

  useEffect(() => {
    if (lang != 'en-EN') {
      if (
        !(localizedCrypt && localizedCrypt[lang]) ||
        !(localizedLibrary && localizedLibrary[lang])
      ) {
        getLocalization(lang);
      }
    }
  }, [lang]);

  return (
    <div className="App">
      <Router>
        <ThemeProvider>
          <Navigation activeDeck={activeDeck} />
        </ThemeProvider>

        <Switch>
          <Suspense fallback={<></>}>
            <Route path="/" exact component={() => <Redirect to="/about" />} />
            <Route path="/about" exact component={() => <About />} />
            <Route
              path="/documentation"
              exact
              component={() => <Documentation />}
            />
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/twd">
              <Twd />
            </Route>
            <Route path="/inventory">
              <Inventory
                inventoryDeckAdd={inventoryDeckAdd}
                inventoryAddToState={inventoryAddToState}
                cardChange={inventoryCardChange}
                setInventoryCrypt={setInventoryCrypt}
                setInventoryLibrary={setInventoryLibrary}
              />
            </Route>
            <Route path="/decks">
              <Decks
                changeTimer={changeTimer}
                activeDeck={activeDeck}
                cardChange={deckCardChange}
              />
            </Route>
            <Route path="/crypt">
              <Crypt
                changeTimer={changeTimer}
                cardChange={deckCardChange}
                activeDeck={
                  activeDeck.src == 'my'
                    ? activeDeck
                    : { src: 'my', deckid: lastDeck.deckid }
                }
              />
            </Route>
            <Route path="/library">
              <Library
                changeTimer={changeTimer}
                cardChange={deckCardChange}
                activeDeck={
                  activeDeck.src == 'my'
                    ? activeDeck
                    : { src: 'my', deckid: lastDeck.deckid }
                }
              />
            </Route>
            <Route path="/cards" exact component={(props) => <Cards />} />
            <Route
              path="/cards/:id"
              component={(props) => <Cards id={props.match.params.id} />}
            />
          </Suspense>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
