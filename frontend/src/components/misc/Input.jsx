import React from 'react';

const Input = ({
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  id,
  className,
  required = false,
  type = 'text',
  autoComplete = 'off',
  spellCheck = false,
  autoFocus = false,
  readOnly = false,
}) => {
  return (
    <input
      className={`min-h-[42px] rounded border border-borderSecondary bg-bgPrimary px-1.5 py-1 dark:border-borderSecondaryDark dark:bg-bgPrimaryDark focus:outline outline-bgCheckboxSelected dark:outline-bgCheckboxSelectedDark ${
        className ?? ''
      }`}
      placeholder={placeholder}
      type={type}
      name={name}
      autoComplete={autoComplete}
      spellCheck={spellCheck}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoFocus={autoFocus}
      disabled={readOnly}
      required={required}
      id={id}
    />
  );
};

export default Input;
