import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchingMyCollection } from '../states/features/seller/sellerSlice';
import { Left, Right } from '../assets';

const Pagination = ({ totalpages, className, pages }) => {
  const dispatch = useDispatch();
  const [page, setpage] = useState(pages);
  const [page2, setpage2] = useState(2);
  const [page3, setpage3] = useState(3);

  // dispatch(fetchingMyCollection(page));

  const increment = () => {
    setpage(page + 1);
    if (page2 === totalpages) {
      setpage2('...');
    } else {
      setpage2(page2 + 1);
    }
    if (page3 === totalpages || page3 === '...') {
      setpage3('...');
    } else {
      setpage3(page3 + 1);
    }
    console.log(page);
    dispatch(fetchingMyCollection(page));
  };
  const decrement = () => {
    setpage(page - 1);
    setpage2(page2 - 1);
    setpage3(page3 - 1);
    if (page2 === '...') {
      setpage2(totalpages);
      setpage3('...');
    }
    if (page3 === '...' && page2 === totalpages) {
      setpage3(totalpages);
    }
  };

  return (
    <div className={className}>
      <button
        type='submit'
        className='pagination-btn'
        onClick={decrement}
        disabled={page === 1}
      >
        <img src={Left} alt='' />
      </button>
      <div className='pagination-text'>
        <span className='flex justify-center bg-blue-900 text-white w-[15px] rounded-md'>
          {page}
        </span>
        <span>{page2}</span>
        <span>{page3}</span>
        <span>...</span>
        <span>{totalpages}</span>
      </div>
      <button
        type='submit'
        className='pagination-btn'
        disabled={page === totalpages}
        onClick={increment}
      >
        <img src={Right} alt='' />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  pages: PropTypes.number,
  className: PropTypes.string,
  totalpages: PropTypes.number
};

Pagination.defaultProps = {
  className: 'pagination'
};
export default Pagination;
