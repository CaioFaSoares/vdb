import React, { useState, useEffect } from 'react';
import Globe from '@/assets/images/icons/globe.svg?react';
import { Flag, Select } from '@/components';
import { useFetch } from '@/hooks';
import { playtestServices } from '@/services';
import { EN, ES, FR, PT } from '@/utils/constants';

const PlaytestReportLanguageSelector = () => {
  const [lang, setLang] = useState();
  const url = `${import.meta.env.VITE_API_URL}/playtest/lang`;
  const { value } = useFetch(url, {}, []);

  useEffect(() => {
    if (value?.value) setLang(value.value);
  }, [value]);

  const languages = {
    [EN]: 'English',
    [ES]: 'Spanish',
    [FR]: 'French',
    [PT]: 'Portuguese',
  };

  const options = Object.keys(languages).map((i) => {
    return {
      value: i,
      name: languages[i],
      label: (
        <div className="flex items-center">
          <div className="flex w-[40px] justify-center">
            <Flag value={i} />
          </div>
          {languages[i]}
        </div>
      ),
    };
  });

  const handleChange = (e) => {
    setLang(e.value);
    playtestServices.changeLang(e.value);
  };

  return (
    <div className="flex gap-2 max-sm:flex-col sm:items-center sm:justify-between sm:gap-4">
      <div className="flex items-center space-x-2 text-lg text-fgSecondary dark:text-fgSecondaryDark">
        <div className="flex min-w-[23px] justify-center">
          <Globe />
        </div>
        <div className="flex whitespace-nowrap font-bold">Playtest Language</div>
      </div>
      <div className="basis-full">
        <Select
          options={options}
          value={options.find((obj) => obj.value === lang)}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PlaytestReportLanguageSelector;
