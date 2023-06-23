import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(
  (
    {
      type,
      className,
      label,
      onChange,
      value,
      onClick,
      name,
      required,
      color,
      backgroundColor,
      placeholder
    },
    ref
  ) => {
    return (
      <div className='relative w-full'>
        <input
          name={name}
          type={type}
          id='floating_outlined'
          className={`${className} w-full block px-4 py-4 text-sm text-${color} bg-${backgroundColor} rounded-lg border-1 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          placeholder={placeholder}
          defaultValue={value}
          onChange={onChange}
          onClick={onClick}
          required={required}
          ref={ref}
        />
        <label
          htmlFor='floating_outlined'
          className={`absolute cursor-text rounded-md text-[1.6rem] text-gray-600 dark:text-gray-600 duration-300 transform -translate-y-0 scale-75 top-2 z-10 origin-[0] bg-${backgroundColor} dark:bg-${backgroundColor} px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-6 left-1`}
        >
          {label}
        </label>
      </div>
    );
  }
);

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number
  ]),
  required: PropTypes.bool,
  onClick: PropTypes.func,
  name: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  placeholder: PropTypes.string
};

Input.defaultProps = {
  className: 'default-input',
  label: '',
  onChange: () => {},
  value: '',
  required: false,
  onClick: () => {},
  name: '',
  type: 'text',
  color: 'black',
  backgroundColor: 'white',
  placeholder: ''
};

export default Input;
