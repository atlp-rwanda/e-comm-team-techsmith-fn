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

const Pagination = ({ className, totalPages }) => {
  const { page } = useSelector((state) => {
    return state.pagination;
  });

  const dispatch = useDispatch();
  const { register } = useForm();

  return (
    <nav
      className={`flex items-center justify-between gap-6 w-full ${className}`}
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
        <option value={3}>Show 3</option>
        <option value={5}>Show 5</option>
        <option value={10}>Show 10</option>
        <option value={20}>Show 20</option>
        <option value={50}>Show 50</option>
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
              <li className='w-fit'>
                <Button
                  value={index + 1}
                  className={`w-fit px-4 py-2 rounded-lg ${
                    index === page
                      ? 'bg-primary text-white'
                      : 'bg-white text-primary'
                  } shadow-lg'}`}
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
  totalPages: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Pagination.defaultProps = {
  className: '',
  totalPages: 1
};

export default Pagination;
