import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DashButton = ({ route, type, className, onClick, value, svg }) => {
  return (
    <Link to={route || '#'} type={type} className={className} onClick={onClick}>
      {svg} <p className='text-left min-w-[50px]'>{value}</p>
    </Link>
  );
};

DashButton.propTypes = {
  route: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired
  ]),
  type: PropTypes.string,
  svg: PropTypes.node
};

DashButton.defaultProps = {
  route: '#',
  className: 'secondary-btn',
  onClick: () => {},
  value: ''
};

export default DashButton;
