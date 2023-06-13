import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddRemoveButton = ({ count1 }) => {
  const [count, setCount] = useState(count1);

  return (
    <div>
      <div className='inline-flex space-x-1'>
        <button
          type='button'
          className='bg-[#ccc] text-[#888] cursor-not-allowed px-3 py-2 border'
        >
          -
        </button>
        <span className='px-5 py-2 border'>{count}</span>
        <button
          type='button'
          className='bg-[#ccc] text-[#888] cursor-not-allowed px-3 py-2 border'
          // onClick={() => {
          //   return setCount(count + 1);
          // }}
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

// "email": "joshua1@gmail.com",
// "password": "Testing@123",
