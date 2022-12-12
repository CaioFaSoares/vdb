import React, { useEffect, useState } from 'react';
import X from 'assets/images/icons/x.svg';
import Check2 from 'assets/images/icons/check2.svg';
import {
  SearchAdditionalFormsText,
  SearchFormButtonLogicToggle,
  SearchFormButtonAddText,
  SearchFormButtonDelText,
} from '../shared_search_components';
import { Input, Checkbox, Button, ButtonIconed } from 'components';
import { useApp } from 'context';

const SearchFormTextAndButtons = ({
  searchForm,
  value,
  preresults,
  showLimit,
  onChange,
  onChangeOptions,
  handleShowResults,
  handleClearButton,
  hideMissing,
  setHideMissing,
}) => {
  const { inventoryMode, isMobile } = useApp();
  const [text, setText] = useState('');

  useEffect(() => {
    if (!text && value[0].value) {
      setText(value[0].value);
    } else if (!value[0].value) {
      setText('');
    }
  }, [value]);

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

  const onTextChange = (e) => {
    onChange(e);
    setText(e.target.value);
  };

  return (
    <div className="space-y-3">
      <div>
        <div className="flex justify-between">
          {isMobile ? (
            <Input
              placeholder="Card Name / Text / RegEx"
              name={0}
              value={text}
              onChange={onTextChange}
            />
          ) : (
            <>
              <Input
                /* TODO ignore enter */
                placeholder="Card Name / Text / RegEx"
                name={0}
                value={text}
                onChange={onTextChange}
                className="w-full rounded-r-none"
              />
              {preresults > showLimit && (
                <ButtonIconed
                  className="flex flex-nowrap rounded-l-none rounded-r-none"
                  variant="primary"
                  onClick={handleShowResults}
                  text={`SHOW ${preresults}`}
                  icon=<Check2 />
                />
              )}
              <Button
                title="Clear Forms & Results"
                variant="primary"
                onClick={handleClearButton}
                className="rounded-l-none"
              >
                <div className="flex items-center">
                  <X />
                </div>
              </Button>
            </>
          )}
        </div>
        <div className="flex">
          <div className="flex w-1/5 space-x-1">
            {value[0].value !== '' && (
              <>
                <SearchFormButtonLogicToggle
                  name="text"
                  value={value[0].logic}
                  i={0}
                  searchForm={searchForm}
                />
                {value.length == 1 ? (
                  <SearchFormButtonAddText searchForm={searchForm} />
                ) : (
                  <SearchFormButtonDelText searchForm={searchForm} i={0} />
                )}
              </>
            )}
          </div>
          <div className="flex items-center justify-end space-x-4">
            {options.map((opt, idx) => {
              return (
                <Checkbox
                  className="text-xs"
                  key={idx}
                  prefix="text"
                  name={0}
                  value={opt.value}
                  onChange={onChangeOptions}
                  label={opt.label}
                  checked={
                    opt.value === 'regex'
                      ? value[0].regex || false
                      : value[0].in === opt.value
                  }
                  onChange={onChangeOptions}
                />
              );
            })}
          </div>
        </div>
      </div>
      <SearchAdditionalFormsText
        value={value}
        onChange={onChange}
        onChangeOptions={onChangeOptions}
        searchForm={searchForm}
      />
      {inventoryMode && (
        <Checkbox
          name={0}
          value="hideMissing"
          label="Search In Inventory"
          checked={hideMissing}
          onChange={() => setHideMissing(!hideMissing)}
        />
      )}
    </div>
  );
};

export default SearchFormTextAndButtons;
