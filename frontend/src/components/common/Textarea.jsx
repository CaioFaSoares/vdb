import React from 'react';

const Textarea = ({
  value,
  rows,
  placeholder,
  onChange,
  onBlur,
  ref,
  className,
  autoComplete = 'off',
  spellCheck = false,
  autoFocus = false,
  readOnly = false,
}) => {
  return (
    <textarea
      className={`rounded border border-borderSecondary bg-bgPrimary px-1.5 py-1 font-mono outline-2 outline-bgCheckboxSelected focus:outline dark:border-borderSecondaryDark dark:bg-bgPrimaryDark dark:outline-bgCheckboxSelectedDark ${
        className ?? ''
      }`}
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      ref={ref}
      autoFocus={autoFocus}
      onBlur={onBlur}
      readOnly={readOnly}
      autoComplete={autoComplete}
      spellCheck={spellCheck}
    />
  );
};

export default Textarea;
