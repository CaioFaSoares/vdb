import React from 'react';
import AsyncSelect from 'react-select/async';
import { useApp } from 'context';

const TwdSearchFormPlayer = ({ inPda, value, form }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;

  const handleChange = (v) => {
    form.author = v.value ?? '';
  };

  const loadOptions = (inputValue) => {
    const url = `${process.env.API_URL}${inPda ? 'pda' : 'twd'}/authors`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    if (inputValue.length >= 2) {
      return fetch(url, options)
        .then((response) => response.json())
        .then((data) =>
          data.filter((value) =>
            value.label.toLowerCase().includes(inputValue.toLowerCase())
          )
        );
    } else {
      return null;
    }
  };

  return (
    <AsyncSelect
      classNamePrefix="react-select"
      cacheOptions
      menuPlacement="top"
      maxMenuHeight={maxMenuHeight}
      autoFocus={false}
      placeholder="Name"
      loadOptions={loadOptions}
      isClearable={true}
      value={
        value
          ? {
              label: value,
              value: value,
            }
          : null
      }
      onChange={handleChange}
    />
  );
};

export default TwdSearchFormPlayer;
