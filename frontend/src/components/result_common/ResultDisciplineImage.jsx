import React from 'react';
import virtuesList from '@/assets/data/virtuesList.json';

const ResultDisciplineImage = ({
  value,
  superior,
  name,
  size = 'md',
  title,
}) => {
  const sizeStyle = {
    xs: 'min-w-[20px] max-w-[20px]',
    sm: 'min-w-[22px] max-w-[22px]',
    md: 'min-w-[25px] max-w-[25px]',
    lg: 'min-w-[31px] max-w-[31px]',
    xl: 'min-w-[37px] max-w-[37px]',
  };

  if (!(superior || virtuesList[value])) {
    const s = {
      sm: 'xs',
      md: 'sm',
      lg: 'md',
      xl: 'lg',
    };
    size = s[size];
  }

  return (
    <img
      className={`inline dark:brightness-[0.85] drop-shadow-[0px_0px_0.8px_#9a9a9a] dark:drop-shadow-[0px_0px_0.8px_#e0e0e0] ${sizeStyle[size]}`}
      src={`${import.meta.env.VITE_BASE_URL}/images/disciplines/${value
        .toLowerCase()
        .replace(/[\s,:!?'.-]/g, '')}${superior ? 'sup' : ''}.svg`}
      name={name}
      id={title ?? value}
      title={title ?? value}
    />
  );
};

export default ResultDisciplineImage;
