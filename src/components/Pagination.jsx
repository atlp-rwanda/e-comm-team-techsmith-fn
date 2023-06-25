import React from 'react';
import { usePagination, DOTS } from '../utils/Pagination';

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul>
      <li onClick={onPrevious}>
        <div className='arrow left' />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className='pagination-item dots'>&#8230;</li>;
        }

        return (
          <li
            onClick={() => {
              return onPageChange(pageNumber);
            }}
          >
            {pageNumber}
          </li>
        );
      })}
      <li onClick={onNext}>
        <div className='arrow right' />
      </li>
    </ul>
  );
};

export default Pagination;
