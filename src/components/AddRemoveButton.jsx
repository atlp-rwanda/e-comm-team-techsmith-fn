import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddRemoveButton = ({ count1 }) => {
  const [count, setCount] = useState(count1);

  return (
    <div>
      <div className='inline-flex space-x-1'>
        <button
          type='button'
          className='hover:bg-[rgb(36,54,101)] hover:text-white cursor-pointer px-3 py-2 border'
          onClick={() => {
            if (count > 0) return setCount(count - 1);
            return setCount(0);
          }}
        >
          -
        </button>
        <span className='px-5 py-2 border'>{count}</span>
        <button
          type='button'
          className='hover:bg-[#243665] hover:text-white cursor-pointer px-3 py-2 border'
          onClick={() => {
            return setCount(count + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AddRemoveButton;

AddRemoveButton.propTypes = {
  count1: PropTypes.number.isRequired
};
