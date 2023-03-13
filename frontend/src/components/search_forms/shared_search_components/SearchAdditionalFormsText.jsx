import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';
import { Input, Checkbox } from '@/components';
import {
  SearchFormButtonAddText,
  SearchFormButtonDel,
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
    });
  }, [value]);

  const onTextChange = (e) => {
    const { name, value } = e.target;
    setText((draft) => {
      draft[name] = value;
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

  const [, ...values] = value;

  return (
    <>
      {values.map((v, idx) => {
        const i = idx + 1;
        return (
          <div className="space-y-1" key={i}>
            <Input
              placeholder="Card Name / Text / RegEx"
              name={i}
              value={text[i] || ''}
              onChange={onTextChange}
              autoFocus
            />
            <div className="flex">
              <div className="flex w-1/5 space-x-1">
                <SearchFormButtonLogicToggle
                  name="text"
                  value={v.logic}
                  i={i}
                  searchForm={searchForm}
                />
                <SearchFormButtonAddText searchForm={searchForm} />
                <SearchFormButtonDel searchForm={searchForm} i={i} />
              </div>
              <div className="flex items-center justify-end space-x-4">
                {options.map((opt, index) => {
                  return (
                    <Checkbox
                      className="text-sm"
                      key={`${i}-${index}`}
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
        );
      })}
    </>
  );
};

export default SearchAdditionalFormsText;
