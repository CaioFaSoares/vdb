import React, { useState } from 'react';
import Check2 from '@/assets/images/icons/check2.svg';
import { Input, Button } from '@/components';

const SeatingRandomDeckAddForm = ({ addDeck }) => {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name) {
      addDeck(name);
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <Input
        placeholder="Add Random Deck"
        value={name}
        onChange={handleChange}
        className="w-full rounded-r-none"
      />
      <Button variant="primary" type="submit" className="rounded-l-none">
        <Check2 />
      </Button>
    </form>
  );
};

export default SeatingRandomDeckAddForm;
