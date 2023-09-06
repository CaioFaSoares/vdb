import { proxy } from 'valtio';
import { inventoryServices } from '@/services';

export const inventoryStore = proxy({
  crypt: {},
  library: {},
});

export const usedStore = proxy({
  crypt: {
    soft: {},
    hard: {},
  },
  library: {
    soft: {},
    hard: {},
  },
});

export const setInventoryCrypt = (v) => {
  inventoryStore.crypt = v;
};

export const setInventoryLibrary = (v) => {
  inventoryStore.library = v;
};

export const setUsedCrypt = (v) => {
  usedStore.crypt = v;
};

export const setUsedLibrary = (v) => {
  usedStore.library = v;
};

export const inventoryCardsAdd = (cards) => {
  const initialCryptState = JSON.parse(JSON.stringify(inventoryStore.crypt));
  const initialLibraryState = JSON.parse(
    JSON.stringify(inventoryStore.library)
  );

  inventoryServices.addCards(cards).catch(() => {
    inventoryStore.crypt = initialCryptState;
    inventoryStore.library = initialLibraryState;
  });

  Object.values(cards).map((card) => {
    const { q, c } = card;

    const store = c.Id > 200000 ? inventoryStore.crypt : inventoryStore.library;
    const isPositive = (store[c.Id]?.q || 0) + q > 0;
    if (isPositive) {
      if (store[c.Id]) {
        store[c.Id].q = store[c.Id].q + q;
      } else {
        store[c.Id] = {
          c: c,
          q: q,
        };
      }
    } else {
      delete store[c.Id];
    }
  });
};

export const inventoryCardChange = (card, q) => {
  const initialState =
    card.Id > 200000
      ? JSON.parse(JSON.stringify(inventoryStore.crypt))
      : JSON.parse(JSON.stringify(inventoryStore.library));

  const store =
    card.Id > 200000 ? inventoryStore.crypt : inventoryStore.library;

  inventoryServices.setCard(card.Id, q).catch(() => {
    if (card.Id > 200000) {
      inventoryStore.crypt = initialState;
    } else {
      inventoryStore.library = initialState;
    }
  });

  if (q >= 0) {
    if (store[card.Id]) {
      store[card.Id].q = q;
    } else {
      store[card.Id] = {
        c: card,
        q: q,
      };
    }
  } else {
    delete store[card.Id];
  }
};

export const inventoryCardTextChange = (card, text) => {
  const initialState =
    card.Id > 200000
      ? JSON.parse(JSON.stringify(inventoryStore.crypt))
      : JSON.parse(JSON.stringify(inventoryStore.library));

  const store =
    card.Id > 200000 ? inventoryStore.crypt : inventoryStore.library;

  inventoryServices.setCardText(card.Id, text).catch(() => {
    if (card.Id > 200000) {
      inventoryStore.crypt = initialState;
    } else {
      inventoryStore.library = initialState;
    }
  });

  if (store[card.Id]) {
    store[card.Id].t = text;
  } else {
    store[card.Id] = {
      q: 0,
      c: card,
      t: text,
    };
  }
};
