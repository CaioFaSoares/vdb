import React from 'react';
import Select from 'react-select';
import { useApp } from '@/context';

const LibrarySearchFormBloodCost = ({ value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'blood';
  const options = ['ANY', '0', '1', '2', '3', '4'].map((i) => ({
    value: i.toLowerCase(),
    name: name,
    label: <div className="flex justify-center">{i}</div>,
  }));

  const morelessOptions = [
    ['le', '<='],
    ['eq', '=='],
    ['ge', '>='],
  ].map((i) => ({
    value: i[0],
    name: name,
    label: <div className="flex justify-center">{i[1]}</div>,
  }));

  return (
    <>
      <div className="flex items-center">
        <div className="w-1/4">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
            Blood Cost:
          </div>
        </div>
        <div className="flex w-3/4 space-x-1">
          <div className="w-1/2">
            <Select
              classNamePrefix="react-select"
              options={morelessOptions}
              isSearchable={false}
              name={`${name}-moreless`}
              value={morelessOptions.find(
                (obj) => obj.value === value.moreless
              )}
              onChange={onChange}
            />
          </div>
          <div className="w-1/2">
            <Select
              classNamePrefix="react-select"
              options={options}
              isSearchable={false}
              name={name}
              maxMenuHeight={maxMenuHeight}
              value={options.find((obj) => obj.value === value[name])}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LibrarySearchFormBloodCost;
