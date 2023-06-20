import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = ({
  route,
  className,
  onClick,
  value,
  type,
  input,
  target,
  buttonId
}) => {
  if (input) {
    return (
      <button
        type={type}
        target={target ? '_blank' : ''}
        className={`${className} bg-primary`}
        onClick={onClick}
      >
        {value}
      </button>
    );
  }
  return (
    <Link
      type={type}
      to={route || ''}
      target={target ? '_blank' : null}
      id={buttonId}
      className={`${className} bg-primary`}
      onClick={onClick}
    >
      {value}
    </Link>
  );
};

Button.propTypes = {
  route: PropTypes.string,
  buttonId: PropTypes.number,
  className: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired
  ]),
  type: PropTypes.string,
  input: PropTypes.bool,
  target: PropTypes.bool
};

Button.defaultProps = {
  route: '',
  className: 'primary-btn',
  onClick: () => {},
  value: '',
  type: 'submit',
  input: false,
  target: false
};

export default Button;
