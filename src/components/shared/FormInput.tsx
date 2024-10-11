import React from 'react';

interface FormInputProps {
  type?: string;
  name: string;
  value: string;
  placeholder?: string;
  isInvalid?: boolean;
  disabled?: boolean;
  className?: string;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      type = 'text',
      name,
      value,
      placeholder = '',
      isInvalid = false,
      disabled = false,
      className = 'input md line',
      maxLength,
      onChange,
      onClick,
    },
    ref
  ) => {
    return (
      <div className="form-item-contents">
        <div
          className={className}
          onClick={onClick ? (e) => onClick(e) : undefined}>
          <input
            ref={ref}
            id={name}
            name={name}
            type={type}
            defaultValue={value}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
            onChange={onChange ? (e) => onChange(e) : undefined}
            className={`${isInvalid ? 'invalid' : ''}`}
          />
        </div>
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
