import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PeopleFill from 'assets/images/icons/people-fill.svg';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import { clearSearchForm, searchTwdForm, searchPdaForm } from 'context';

const ButtonSearchCardInDecks = ({ cardid, target }) => {
  const navigate = useNavigate();
  const value = { [cardid]: { q: 1, m: 'gt' } };

  const handleButton = () => {
    clearSearchForm(target);
    if (target === 'pda') {
      searchPdaForm[cardid > 200000 ? 'crypt' : 'library'] = value;
    } else {
      searchTwdForm[cardid > 200000 ? 'crypt' : 'library'] = value;
    }
    navigate(
      `/${target}?q={"${
        cardid > 200000 ? 'crypt' : 'library'
      }"%3A{"${cardid}"%3A{"q"%3A1%2C"m"%3A"gt"}}}`
    );
  };

  return (
    <Button
      title={`Search in ${target.toUpperCase()}`}
      variant="primary"
      onClick={handleButton}
    >
      {target === 'pda' ? <PeopleFill /> : <TrophyFill />}
    </Button>
  );
};

export default ButtonSearchCardInDecks;
