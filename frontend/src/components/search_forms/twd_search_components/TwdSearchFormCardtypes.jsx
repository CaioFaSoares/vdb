import React, { useState } from 'react';
import { Select } from '@/components';
import { Input, Toggle, ResultLibraryTypeImage } from '@/components';
import { useApp } from '@/context';

const TwdSearchFormCardtypes = ({ value, onChange }) => {
  const [isManual, setIsManual] = useState();
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'cardtypes';
  const types = [
    [
      'Master',
      [
        ['0,15', '< 15%'],
        ['15,25', '15-25%'],
        ['25,35', '25-35%'],
        ['35,100', '> 35%'],
      ],
    ],
    [
      'Action',
      [
        ['0,0', 'None'],
        ['0,5', '< 5%'],
        ['5,15', '5-15%'],
        ['15,100', '> 15%'],
      ],
    ],
    [
      'Political Action',
      [
        ['0,0', 'None'],
        ['0,5', '< 5%'],
        ['5,15', '5-15%'],
        ['15,100', '> 15%'],
      ],
    ],
    [
      'Ally',
      [
        ['0,0', 'None'],
        ['0,5', '< 5%'],
        ['5,15', '5-15%'],
        ['15,100', '> 15%'],
      ],
    ],
    [
      'Equipment',
      [
        ['0,0', 'None'],
        ['0,5', '< 5%'],
        ['5,10', '5-10%'],
        ['10,100', '> 10%'],
      ],
    ],
    [
      'Retainer',
      [
        ['0,0', 'None'],
        ['0,5', '< 5%'],
        ['5,10', '5-10%'],
        ['10,100', '> 10%'],
      ],
    ],
    [
      'Action Modifier',
      [
        ['0,0', 'None'],
        ['0,10', '< 10%'],
        ['10,20', '10-20%'],
        ['20,30', '20-30%'],
        ['30,100', '> 30%'],
      ],
    ],
    [
      'Reaction',
      [
        ['0,0', 'None'],
        ['0,10', '< 10%'],
        ['10,20', '10-20%'],
        ['20,30', '20-30%'],
        ['30,100', '> 30%'],
      ],
    ],
    [
      'Combat',
      [
        ['0,0', 'None'],
        ['0,10', '< 10%'],
        ['10,20', '10-20%'],
        ['20,30', '20-30%'],
        ['30,100', '> 30%'],
      ],
    ],
    [
      'Event',
      [
        ['0,0', 'None'],
        ['0,4', '< 3%'],
        ['4,8', '3-7%'],
        ['8,100', '> 7%'],
      ],
    ],
  ];

  const handleManual = (e) => {
    const v = e.target.value;
    let [min, max] = value[e.target.name].split(',');
    if (e.target.id == 'min') {
      if (v >= 0) {
        min = e.target.value ?? 0;
      }
    } else {
      if (v <= 100) {
        max = e.target.value ?? 100;
      }
    }

    min = min === 'any' || !min ? 0 : min;
    max = max === 'any' || !max ? 100 : max;
    onChange(
      { name: e.target.name, value: `${min},${max}` },
      { name: 'cardtypes' }
    );
  };

  const formsLeft = [];
  const formsRight = [];

  types.map((i, idx) => {
    const options = [
      {
        value: 'any',
        name: i[0].toLowerCase(),
        label: <div className="flex justify-center">ANY</div>,
      },
    ];

    i[1].map((j) => {
      options.push({
        value: j[0],
        name: i[0].toLowerCase(),
        label: <div className="flex justify-center">{j[1]}</div>,
      });
    });

    const [min, max] =
      value[i[0].toLowerCase()] == 'any'
        ? [0, 100]
        : value[i[0].toLowerCase()].split(',');

    const form = (
      <div className="flex items-center space-x-1" key={i[0]}>
        <div className="flex w-1/6 justify-center">
          <ResultLibraryTypeImage className="h-[29px]" value={i[0]} />
        </div>
        <div className="w-5/6">
          {isManual ? (
            <div className="flex justify-between items-center gap-1">
              <div className="basis-full">
                <input
                  className="min-h-[42px] w-full rounded border border-borderSecondary bg-bgPrimary text-center text-fgPrimary outline-1 outline-bgCheckboxSelected focus:outline dark:border-borderSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark dark:outline-bgCheckboxSelectedDark"
                  type="number"
                  value={min}
                  name={i[0].toLowerCase()}
                  id="min"
                  onChange={handleManual}
                />
              </div>
              -
              <div className="basis-full">
                <input
                  className="min-h-[42px] w-full rounded border border-borderSecondary bg-bgPrimary text-center text-fgPrimary outline-1 outline-bgCheckboxSelected focus:outline dark:border-borderSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark dark:outline-bgCheckboxSelectedDark"
                  type="number"
                  name={i[0].toLowerCase()}
                  id="max"
                  value={max}
                  onChange={handleManual}
                />
              </div>
            </div>
          ) : (
            <Select
              options={options}
              isSearchable={false}
              name={name}
              maxMenuHeight={maxMenuHeight}
              value={options.find(
                (obj) => obj.value === value[i[0].toLowerCase()]
              )}
              onChange={onChange}
            />
          )}
        </div>
      </div>
    );

    if (idx < 5) {
      formsLeft.push(form);
    } else {
      formsRight.push(form);
    }
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
          Library Card Types:
        </div>
        <Toggle isOn={isManual} toggle={() => setIsManual(!isManual)}>
          Custom %
        </Toggle>
      </div>
      <div className="flex space-x-6">
        <div className="w-1/2 space-y-1">{formsLeft}</div>
        <div className="w-1/2 space-y-1">{formsRight}</div>
      </div>
    </div>
  );
};

export default TwdSearchFormCardtypes;
