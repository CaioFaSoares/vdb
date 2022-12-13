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
  variant,
}) => {
  const btnVariant = `btn-${variant}`;

  return (
    <button
      className={`${btnVariant} items-center justify-center rounded-md px-3 py-1.5 ${
        className ?? ''
      }`}
      onClick={onClick}
      title={title}
      disabled={disabled}
      id={id}
      name={name}
      value={value}
    >
      {children}
    </button>
  );
};

export default Button;
