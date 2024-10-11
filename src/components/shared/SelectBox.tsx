import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectBoxProps {
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  useAllOptionName?: string;
  className?: string;
}

const SelectBox = React.forwardRef<HTMLSelectElement, SelectBoxProps>(
  (
    {
      name,
      options,
      value,
      onChange,
      useAllOptionName = '선택',
      className = 'md line',
    },
    ref
  ) => {
    return (
      <div className={`select-box ${className}`}>
        {/* 셀렉트 박스 */}
        <select
          ref={ref}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}>
          {useAllOptionName && <option value="">{useAllOptionName}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

SelectBox.displayName = 'SelectBox';

export default SelectBox;
