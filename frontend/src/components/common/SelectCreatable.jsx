import React from 'react';
import ReactSelectCreatable from 'react-select/creatable';

const SelectCreatable = React.forwardRef(
  (
    {
      autoFocus,
      isClearable = false,
      isDisabled = false,
      isMulti,
      menuPlacement,
      noBorder,
      noOptionsMessage,
      noRemove,
      onChange,
      options,
      placeholder,
      value,
      className = '',
      borderStyle = 'border',
      roundedStyle = 'rounded',
    },
    ref,
  ) => {
    return (
      <ReactSelectCreatable
        autoFocus={autoFocus}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isMulti={isMulti}
        menuPlacement={menuPlacement}
        noOptionsMessage={noOptionsMessage}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        ref={ref}
        unstyled
        value={value}
        classNames={{
          control: (state) => `
            ${
              noBorder
                ? ''
                : state.isFocused
                  ? `${roundedStyle} ${borderStyle} bg-bgPrimary dark:bg-bgPrimaryDark border-bgCheckboxSelected dark:border-bgCheckboxSelectedDark`
                  : `${roundedStyle} ${borderStyle} bg-bgPrimary dark:bg-bgPrimaryDark border-borderSecondary dark:border-borderSecondaryDark`
            }
          `,
          dropdownIndicator: () => 'max-w-[0px] max-h-[0px]',
          indicatorsContainer: () => 'rounded max-h-[0px] max-w-[0px]',
          menu: () => 'my-2 rounded border-bgThird dark:border-bgThirdDark',
          menuList: () => 'bg-bgPrimary dark:bg-bgPrimaryDark',
          option: (state) => `p-2
          ${
            state.isFocused
              ? 'bg-bgCheckboxSelected dark:bg-bgCheckboxSelectedDark'
              : state.isSelected
                ? 'bg-borderPrimary dark:bg-borderPrimaryDark'
                : ''
          }
`,
          valueContainer: () => 'flex px-[5px] min-h-[40px] gap-1 p-1',
          container: () => `bg-bgPrimary dark:bg-bgPrimaryDark
          ${roundedStyle}
          ${className}
`,
          input: () => (noRemove ? 'max-w-[0px] max-h-[0px]' : ''),
          multiValue: () => 'bg-bgButton dark:bg-bgButtonDark rounded',
          multiValueLabel:
            () => `text-sm px-[5px] py-1 border-borderSecondary dark:border-borderSecondaryDark
          ${
            noRemove
              ? 'border rounded'
              : 'border-l border-y border-borderSecondary dark:border-borderSecondaryDark rounded-l rounded-y'
          }`,
          multiValueRemove: () =>
            noRemove
              ? 'max-w-[0px] max-h-[0px] hidden'
              : 'pr-1 bg-bgButton dark:bg-bgButtonDark rounded-r border-r border-y border-borderSecondary dark:border-borderSecondaryDark',
          noOptionsMessage: () => 'rounded p-2',
          placeholder: () => 'text-midGray dark:text-midGrayDark',
          clearIndicator: () => 'text-lightGray dark:text-lightGrayDark pr-2',
        }}
      />
    );
  },
);
SelectCreatable.displayName = 'SelectCreatable';

export default SelectCreatable;
