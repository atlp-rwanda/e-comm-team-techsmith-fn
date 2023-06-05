import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = ({ route, type, className, onClick, value }) => {
  return (
    <Link to={route || '#'} type={type} className={className} onClick={onClick}>
      {value}
    </Link>
  );
};

Button.propTypes = {
  route: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired
  ]),
  type: PropTypes.string
};

Button.defaultProps = {
  route: '#',
  className: 'primary-btn',
  onClick: () => {},
  value: ''
};

export default Button;
