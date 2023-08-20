import React, { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import Check2 from '@/assets/images/icons/check2.svg';
import {
  SearchAdditionalFormsText,
  SearchFormButtonLogicToggle,
  SearchFormButtonAddText,
  SearchFormButtonDel,
  Input,
  Checkbox,
  ButtonClose,
  ButtonIconed,
} from '@/components';
import { useApp } from '@/context';

const SearchFormTextAndButtons = ({
  searchForm,
  value,
  preresults,
  showLimit,
  onChange,
  onChangeOptions,
  handleShowResults,
  handleClear,
  hideMissing,
  setHideMissing,
}) => {
  const { inventoryMode, isMobile } = useApp();
  const [text, setText] = useState('');

  useEffect(() => {
    setText(value[0].value ?? '');
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
    <div className="space-y-2">
      <div className="space-y-1">
        <div className="flex">
          <Input
            placeholder="Card Name / Text / RegEx"
            name={0}
            value={text}
            onChange={onTextChange}
            borderStyle="max-sm:border sm:border-y sm:border-l"
            roundedStyle="sm:rounded-r-none rounded"
          />
          {!isMobile && (
            <>
              {preresults > showLimit && (
                <ButtonIconed
                  className="whitespace-nowrap rounded-l-none rounded-r-none"
                  variant="primary"
                  onClick={handleShowResults}
                  text={`SHOW ${preresults}`}
                  icon={<Check2 />}
                />
              )}
              <ButtonClose
                title="Clear Forms & Results"
                className="rounded-l-none"
                handleClick={handleClear}
              />
            </>
          )}
        </div>
        <div className="flex justify-between">
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
                  <SearchFormButtonDel searchForm={searchForm} i={0} />
                )}
              </>
            )}
          </div>
          <div className="flex items-center justify-end space-x-4">
            {options.map((opt, idx) => {
              return (
                <Checkbox
                  className="text-sm"
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
          checked={!!hideMissing}
          onChange={() => setHideMissing(!hideMissing)}
        />
      )}
    </div>
  );
};

export default SearchFormTextAndButtons;
