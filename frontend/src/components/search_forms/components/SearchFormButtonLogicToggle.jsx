import React from 'react';
import { Button } from '@/components';
import Exclamation from '@/assets/images/icons/exclamation.svg?react';

const SearchFormButtonLogicToggle = ({ name, i, value, searchForm, withAnd }) => {
  const handleToggleForm = () => {
    if (name === 'text') {
      switch (value) {
        case 'and':
          searchForm[name][i].logic = 'not';
          break;
        case 'not':
          searchForm[name][i].logic = 'and';
          break;
      }
    } else {
      switch (value) {
        case 'or':
          searchForm[name].logic = withAnd ? 'and' : 'not';
          break;
        case 'and':
          searchForm[name].logic = 'not';
          break;
        case 'not':
          searchForm[name].logic = 'or';
          break;
      }
    }
  };

  let icon = '';
  let title = '';

  switch (value) {
    case 'and':
      icon = '&';
      title = 'Logic: AND';
      break;
    case 'or':
      icon = '//';
      title = 'Logic: OR';
      break;
    case 'not':
      icon = <Exclamation />;
      title = 'Logic: NOT';
      break;
  }

  return (
    <Button
      className="h-[18px] w-[18px] text-[10px]"
      variant="primary"
      onClick={handleToggleForm}
      title={title}
      noPadding
    >
      {icon}
    </Button>
  );
};

export default SearchFormButtonLogicToggle;
