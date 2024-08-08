import {
  CLAN_DISCIPLINE,
  COST_MAX_MIN,
  COST_MAX_MINx,
  COST_MIN_MAX,
  COST_MIN_MAXx,
  DATE_PRINT,
  DATE_WIN,
  GROUPED_TYPE,
  NAME,
  QUANTITY,
  TYPE,
  TYPEx,
  cardtypeSortedFull,
} from '@/utils/constants';

import {
  byBloodCost,
  byPoolCost,
  byDiscipline,
  byQuantity,
  byType,
  byCardName,
  byClanOpt,
  byPlayer,
  byDateWin,
  byDatePrint,
  getCardProperty,
} from '@/utils';

const byGroupedType = (a, b) => {
  return (
    cardtypeSortedFull.indexOf(getCardProperty(a, TYPE)) -
    cardtypeSortedFull.indexOf(getCardProperty(b, TYPE))
  );
};

const librarySort = (cards, sortMethod) => {
  if (cards) {
    switch (sortMethod) {
      case NAME:
        return cards.toSorted(byCardName);
      case QUANTITY:
        return cards.toSorted(byCardName).toSorted(byQuantity);
      case CLAN_DISCIPLINE:
        return cards
          .toSorted(byCardName)
          .toSorted(byType)
          .toSorted(byDiscipline)
          .toSorted(byClanOpt);
      case TYPE:
        return cards
          .toSorted(byCardName)
          .toSorted(byDiscipline)
          .toSorted(byClanOpt)
          .toSorted(byType);
      case TYPEx:
        return cards.toSorted(byCardName).toSorted(byType);
      case GROUPED_TYPE:
        return cards.toSorted(byCardName).toSorted(byGroupedType);
      case COST_MIN_MAX:
        return cards
          .toSorted(byCardName)
          .toReversed()
          .toSorted(byDiscipline)
          .toSorted(byClanOpt)
          .toSorted(byType)
          .toSorted(byPoolCost)
          .toSorted(byBloodCost)
          .toReversed();
      case COST_MAX_MIN:
        return cards
          .toSorted(byCardName)
          .toSorted(byDiscipline)
          .toSorted(byClanOpt)
          .toSorted(byType)
          .toSorted(byPoolCost)
          .toSorted(byBloodCost);
      case COST_MAX_MINx:
        return cards.toSorted(byCardName).toSorted(byPoolCost).toSorted(byBloodCost);
      case COST_MIN_MAXx:
        return cards
          .toSorted(byCardName)
          .toReversed()
          .toSorted(byPoolCost)
          .toSorted(byBloodCost)
          .toReversed();
      case PLAYER:
        return cards.toSorted(byCardName).toSorted(byPlayer);
      case DATE_PRINT:
        return cards.toSorted(byCardName).toSorted(byDatePrint);
      case DATE_WIN:
        return cards.toSorted(byCardName).toSorted(byDateWin);
      default:
        return cards;
    }
  }

  return null;
};

export default librarySort;
