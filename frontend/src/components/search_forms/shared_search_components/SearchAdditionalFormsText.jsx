import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { Checkbox } from 'components';
import {
  SearchFormButtonAddText,
  SearchFormButtonDelText,
  SearchFormButtonLogicToggle,
} from '../shared_search_components';

const SearchAdditionalFormsText = ({
  value,
  onChange,
  onChangeOptions,
  searchForm,
}) => {
  const [text, setText] = useImmer([]);

  useEffect(() => {
    setText((draft) => {
      value.map((v, idx) => {
        draft[idx] = v.value.toString();
      });
      return draft;
    });
  }, [value]);

  const onTextChange = (e) => {
    const { name, value } = e.target;
    setText((draft) => {
      draft[name] = value;
      return draft;
    });

    onChange(e);
  };

  const options = [
    {
      value: 'name',
      label: 'Only in Name',
    },
    {
      value: 'text',
      label: 'Only in Text',
    },
    {
      value: 'regex',
      label: 'Regex',
    },
  ];

  const forms = [];
  for (let i = 1; i < value.length; i++) {
    forms.push(
      <div key={i} className="mx-0 flex flex-row items-center px-0 pt-2">
        <input
          placeholder="Card Name / Text / RegEx"
          type="text"
          name={i}
          autoComplete="off"
          spellCheck="false"
          value={text[i] || ''}
          onChange={onTextChange}
          autoFocus={true}
        />
        <div className="mx-0 flex flex-row px-0 pt-1">
          <div className="basis-2/12 px-0 md:basis-1/4">
            <div className="flex flex-row space-x-1">
              <SearchFormButtonLogicToggle
                name="text"
                value={value[i].logic}
                i={i}
                searchForm={searchForm}
              />
              <SearchFormButtonAddText searchForm={searchForm} />
              <SearchFormButtonDelText searchForm={searchForm} i={i} />
            </div>
          </div>
          <div className="flex justify-end px-0">
            <div className="flex flex-col items-start space-x-2">
              {options.map((opt, idx) => {
                return (
                  <Checkbox
                    key={idx}
                    prefix="text"
                    name={i}
                    value={opt.value}
                    onChange={onChangeOptions}
                    label={opt.label}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{forms}</>;
};

export default SearchAdditionalFormsText;
