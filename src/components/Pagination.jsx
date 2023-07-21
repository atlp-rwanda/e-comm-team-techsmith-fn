import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './Button';
import {
  setPage,
  setSize
} from '../states/features/pagination/paginationSlice';

const Pagination = ({ className, totalPages, pageOptions }) => {
  const { page } = useSelector((state) => {
    return state.pagination;
  });

  const dispatch = useDispatch();
  const { register } = useForm();

  return (
    <nav
      className={`flex items-center gap-6 w-full ${className}`}
    >
      <select
        className='w-fit text-[1.3rem] rounded-md'
        {...register('size', {
          defaultValue: 5,
          onChange: (e) => {
            dispatch(setSize(e.target.value));
          }
        })}
      >
        {pageOptions.map((option) => {
          return <option key={option} value={option}>Show {option}</option>;
        })}
      </select>
      <div className='flex items-center justify-center gap-6'>
        <Button
          onClick={() => {
            dispatch(setPage(page - 1));
          }}
          className='w-fit p-3 rounded-lg bg-primary text-white shadow-lg'
          value={
            <FontAwesomeIcon
              className='text-[1.4rem] text-white'
              icon={['fas', 'chevron-left']}
            />
          }
        />
        <ul className='flex items-center justify-center gap-4'>
          {Array.from(Array(totalPages).keys()).map((index) => {
            return (
              <li className='w-fit' key={index}>
                <Button
                  value={String(index + 1)}
                  key={index}
                  className={`w-fit px-4 py-2 rounded-lg ${index === page ? 'bg-primary text-white' : 'bg-white text-primary'} shadow-lg'}`}
                  onClick={() => {
                    dispatch(setPage(index));
                  }}
                />
              </li>
            );
          })}
        </ul>

        <Button
          className='w-fit p-3 rounded-lg bg-primary text-white shadow-lg'
          onClick={() => {
            dispatch(setPage(page + 1));
          }}
          value={
            <FontAwesomeIcon
              className='text-[1.4rem] text-white'
              icon={['fas', 'chevron-right']}
            />
          }
        />
      </div>
    </nav>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  totalPages: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pageOptions: PropTypes.arrayOf(PropTypes.number),
};

Pagination.defaultProps = {
  className: '',
  totalPages: 1,
  pageOptions: [
    3, 5, 10, 20, 50
  ],
};

export default Pagination;
