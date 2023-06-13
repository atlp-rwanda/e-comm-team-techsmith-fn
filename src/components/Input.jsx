import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type,
  className,
  placeholder,
  onChange,
  value,
  required,
  onClick,
  name
}) => {
  return (
    <input
      type={type}
      className={`${className} w-11/12 px-8 py-4 text-sm border-primary rounded-[.5rem]`}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={value}
      required={required}
      onClick={onClick}
      name={name}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  required: PropTypes.bool,
  onClick: PropTypes.func,
  name: PropTypes.string
};

Input.defaultProps = {
  className: 'default-input',
  placeholder: '',
  onChange: () => {},
  value: '',
  required: false,
  onClick: () => {},
  name: ''
};

export default Input;
