import React, { useState, useLayoutEffect } from 'react';
import defaultsTwdForm from '../pages/components/forms_data/defaultsTwdForm.json';
import defaultsCryptForm from '../pages/components/forms_data/defaultsCryptForm.json';
import defaultsLibraryForm from '../pages/components/forms_data/defaultsLibraryForm.json';

const AppContext = React.createContext();

export default AppContext;

export const AppProvider = (props) => {
  const isMobile = window.matchMedia('(max-width: 540px)').matches;
  const isWide = window.matchMedia('(min-width: 1600px)').matches;

  const [username, setUsername] = useState(undefined);
  const [publicName, setPublicName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [lang, setLang] = useState('en-EN');
  const [showImage, setShowImage] = useState(undefined);
  const [addMode, setAddMode] = useState(undefined);
  const [inventoryMode, setInventoryMode] = useState(undefined);
  const [hideMissing, setHideMissing] = useState(undefined);
  const [cryptSortByCap, setCryptSortByCap] = useState(undefined);
  const [cryptSearchSort, setCryptSearchSort] = useState(undefined);
  const [librarySearchSort, setLibrarySearchSort] = useState(undefined);

  const [cryptCardBase, setCryptCardBase] = useState(undefined);
  const [libraryCardBase, setLibraryCardBase] = useState(undefined);
  const [localizedCrypt, setLocalizedCrypt] = useState(undefined);
  const [localizedLibrary, setLocalizedLibrary] = useState(undefined);
  const [nativeCrypt, setNativeCrypt] = useState(undefined);
  const [nativeLibrary, setNativeLibrary] = useState(undefined);

  const [twdFormState, setTwdFormState] = useState(
    JSON.parse(JSON.stringify(defaultsTwdForm))
  );
  const [cryptFormState, setCryptFormState] = useState(
    JSON.parse(JSON.stringify(defaultsCryptForm))
  );
  const [libraryFormState, setLibraryFormState] = useState(
    JSON.parse(JSON.stringify(defaultsLibraryForm))
  );
  const [showTwdSearch, setShowTwdSearch] = useState(true);
  const [showCryptSearch, setShowCryptSearch] = useState(true);
  const [showLibrarySearch, setShowLibrarySearch] = useState(true);

  const [twdResults, setTwdResults] = useState(undefined);
  const [cryptResults, setCryptResults] = useState(undefined);
  const [libraryResults, setLibraryResults] = useState(undefined);

  const [inventoryCrypt, setInventoryCrypt] = useState({});
  const [inventoryLibrary, setInventoryLibrary] = useState({});
  const [usedCryptCards, setUsedCryptCards] = useState({
    soft: {},
    hard: {},
  });
  const [usedLibraryCards, setUsedLibraryCards] = useState({
    soft: {},
    hard: {},
  });

  const [preconDecks, setPreconDecks] = useState({});
  const [decks, setDecks] = useState(undefined);
  const [activeDeck, setActiveDeck] = useState({ src: null, deckid: null });
  const [sharedDeck, setSharedDeck] = useState(undefined);

  const [changeTimer, setChangeTimer] = useState(false);
  const [timers, setTimers] = useState([]);

  const changeLang = (lang) => {
    setLang(lang);
    window.localStorage.setItem('lang', lang);
  };

  const toggleShowImage = () => {
    setShowImage(!showImage);
    window.localStorage.setItem('showImage', !showImage);
  };

  const toggleInventoryMode = () => {
    setInventoryMode(!inventoryMode);
    window.localStorage.setItem('inventoryMode', !inventoryMode);
  };

  const toggleCryptSort = () => {
    setCryptSortByCap(!cryptSortByCap);
    window.localStorage.setItem('cryptSortByCap', !cryptSortByCap);
  };

  const changeCryptSearchSort = (method) => {
    setCryptSearchSort(method);
    window.localStorage.setItem('cryptSearchSort', method);
  };

  const changeLibrarySearchSort = (method) => {
    setLibrarySearchSort(method);
    window.localStorage.setItem('librarySearchSort', method);
  };

  const toggleAddMode = () => {
    setAddMode(!addMode);
    window.localStorage.setItem('addMode', !addMode);
  };

  useLayoutEffect(() => {
    const cs = window.localStorage.getItem('cryptSearchSort');
    if (cs) {
      setCryptSearchSort(cs);
    } else {
      setCryptSearchSort('Capacity - Min to Max');
    }

    const ls = window.localStorage.getItem('librarySearchSort');
    if (ls) {
      setLibrarySearchSort(ls);
    } else {
      setLibrarySearchSort('Type');
    }

    const lg = window.localStorage.getItem('lang');
    if (lg) {
      setLang(lg);
    } else {
      setLang('en-EN');
    }

    const am = window.localStorage.getItem('addMode');
    if (am === 'false') {
      setAddMode(false);
    } else {
      setAddMode(true);
    }

    const im = window.localStorage.getItem('inventoryMode');
    if (im === 'true') {
      setInventoryMode(true);
    } else {
      setInventoryMode(false);
    }

    const csc = window.localStorage.getItem('cryptSortByCap');
    if (csc === 'true') {
      setCryptSortByCap(true);
    } else {
      setCryptSortByCap(false);
    }

    const si = window.localStorage.getItem('showImage');
    if (si === 'false') {
      setShowImage(false);
    } else {
      setShowImage(true);
    }
  }, []);

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
          Object.keys(data).map((i) => {
            Object.keys(data[i].crypt).map((j) => {
              data[i].crypt[j].c = cryptCardBase[j];
            });
            Object.keys(data[i].library).map((j) => {
              data[i].library[j].c = libraryCardBase[j];
            });
          });
          setDecks(data);
        } else {
          setDecks({});
        }
      });
  };

  const deckUpdate = (deckid, field, value) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [field]: value }),
    };

    fetch(url, options).then(() => getDecks());
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
          oldState[deckid]['crypt'][cardid] = {
            c: cryptCardBase[cardid],
            q: count,
          };
          return oldState;
        });
      } else {
        setDecks((prevState) => {
          const oldState = { ...prevState };
          oldState[deckid]['library'][cardid] = {
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

  const deckRouter = (pointer) => {
    if (pointer) {
      switch (pointer['src']) {
        case 'my':
          return decks && decks[pointer['deckid']];
        case 'precons':
          return preconDecks && preconDecks[pointer['deckid']];
        case 'shared':
        case 'twd':
          return sharedDeck && sharedDeck[pointer['deckid']];
      }
    }
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

  return (
    <AppContext.Provider
      value={{
        isMobile,
        isWide,
        username,
        setUsername,
        publicName,
        setPublicName,
        email,
        setEmail,
        lang,
        changeLang,
        hideMissing,
        setHideMissing,
        inventoryMode,
        toggleInventoryMode,
        addMode,
        toggleAddMode,
        showImage,
        toggleShowImage,
        cryptSortByCap,
        toggleCryptSort,
        cryptSearchSort,
        librarySearchSort,
        changeCryptSearchSort,
        changeLibrarySearchSort,

        cryptCardBase,
        setCryptCardBase,
        libraryCardBase,
        setLibraryCardBase,
        localizedCrypt,
        setLocalizedCrypt,
        localizedLibrary,
        setLocalizedLibrary,
        nativeCrypt,
        setNativeCrypt,
        nativeLibrary,
        setNativeLibrary,

        twdFormState,
        setTwdFormState,
        cryptFormState,
        setCryptFormState,
        libraryFormState,
        setLibraryFormState,

        twdResults,
        setTwdResults,
        cryptResults,
        setCryptResults,
        libraryResults,
        setLibraryResults,

        usedCryptCards,
        setUsedCryptCards,
        usedLibraryCards,
        setUsedLibraryCards,

        showTwdSearch,
        setShowTwdSearch,
        showCryptSearch,
        setShowCryptSearch,
        showLibrarySearch,
        setShowLibrarySearch,

        inventoryCrypt,
        setInventoryCrypt,
        inventoryLibrary,
        setInventoryLibrary,

        preconDecks,
        setPreconDecks,
        decks,
        setDecks,
        activeDeck,
        setActiveDeck,
        sharedDeck,
        setSharedDeck,
        getDecks,
        deckRouter,
        deckUpdate,
        deckCardChange,
        inventoryCardChange,
        changeTimer,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
