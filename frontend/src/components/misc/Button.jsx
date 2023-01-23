import React from 'react';

const Button = ({
  children,
  className,
  disabled,
  id,
  name,
  onClick,
  title,
  value,
  type,
  tabIndex,
  variant = 'primary',
}) => {
  const getStyle = (variant) => {
    // TODO style hover && copy to MenuButton
    // hover:bg-borderPrimary dark:hover:bg-borderPrimaryDark hover:border hover:border-borderPrimary dark:hover:border-borderPrimaryDark

    switch (variant) {
      case 'primary':
        return 'text-fgThird dark:text-fgThirdDark bg-bgButton dark:bg-bgButtonDark border border-borderSecondary dark:border-borderSecondaryDark disabled:opacity-40 disabled:text-fgPrimary dark:disabled:text-fgPrimaryDark';
      case 'secondary':
        return 'text-fgThird dark:text-fgThirdDark bg-bgButtonSecondary dark:bg-bgButtonSecondaryDark border border-borderThird dark:border-borderThirdDark';
      case 'third':
        return 'bg-borderPrimary dark:bg-borderPrimaryDark';
      case 'outline-primary':
        return 'border border-borderSecondary dark:border-borderSecondaryDark';
      case 'danger':
        return 'bg-bgError dark:bg-bgErrorDark hover:bg-bgErrorSecondary dark:hover:bg-bgErrorSecondaryDark border border-borderSecondary dark:border-borderSecondaryDark';
      case 'success':
        return 'bg-bgSuccess dark:bg-bgSuccessDark border border-borderSecondary dark:border-borderSecondaryDark';
    }
  };

  const baseStyle =
    'focus:outline outline-2 outline-bgCheckboxSelected dark:outline-bgCheckboxSelectedDark';

  const customStyle = getStyle(variant);

  return (
    <button
      className={`${baseStyle} ${customStyle} items-center justify-center rounded px-3 py-1.5 ${
        className ?? ''
      }`}
      onClick={onClick}
      title={title}
      disabled={disabled}
      id={id}
      name={name}
      value={value}
      tabIndex={tabIndex}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
