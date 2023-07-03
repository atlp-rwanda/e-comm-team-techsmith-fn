import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { COLUMNS } from './Column';
import NavigationDashbooard from './UsersNavigationBigScreen';
import Button from '../components/Button';
import { Userlist } from './Userlist';
import { loading, Left, Right } from '../assets';
import { fetchingAllUsers } from '../states/features/users/usersSlice';
import NavigationDashboardSmall from './UsersNavigationSmallScreen';

const AdminManageUserContainer = () => {
  const dispatch = useDispatch();
  const { isPending, totalpages, userList, networkError } = useSelector(
    (state) => {
      return state.users;
    }
  );
  const [page, setpage] = useState(1);
  const [page2, setpage2] = useState(2);
  const [page3, setpage3] = useState(3);

  useEffect(() => {
    dispatch(fetchingAllUsers(page));
  }, [page]);
  const columns = useMemo(() => {return (COLUMNS, [])});
  const data = useMemo(() =>{ return (Userlist, [])});
  const tableInstance = useTable({ columns: columns, data: data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow  } =
    tableInstance;
  return (
    <div className='manage_accounts_wrapper h-screen'>
      <NavigationDashbooard />
      <div className='manage_accounts_content'>
        <h1 className='bigTitle_users  mt-10'>Manage Users</h1>
        <div className='createUserBox mb-10'>
          <h1 className='listOfUsers '>List of users</h1>
          <Button
            className='primary-btn create_user_btn'
            value='+  Add user'
            route='/'
            onClick={() => {}}
          />
          <Button
            className='create_user_btn_small'
            value='+'
            route='/'
            onClick={() => {}}
          />
        </div>
        <div className='manage_accounts_content_table h-4.5/6'>


          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) =>  { return(
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {return(
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  )})}
                </tr>
              )})}
            </thead>

            <tbody {...getTableBodyProps()}>
               {rows.map((row) => {
        prepareRow(row)
        return(
          <tr {...row.getRowProps()}>

            {row.cells.map((cell) => {

            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>

            })}
       
          </tr>
        )
      })}
              {/* {{ userList } && <Userlist rows={rows} prepareRow={prepareRow} userList={userList} />} */}
            </tbody>
          </table>

          {isPending && (
            <div className='loading_div w-full'>
              Loading...
              <img src={loading} alt='' />
            </div>
          )}
          {networkError && (
            <div className='loading_div w-full'>
              Server or Network Error{' '}
              <FontAwesomeIcon icon='fa-solid fa-exclamation-circle' />
            </div>
          )}

          {!isPending && (
            <div className='pagination'>
              <button
                type='submit'
                className='pagination-btn'
                onClick={() => {
                  setpage(page - 1);
                  setpage2(page2 - 1);
                  setpage3(page3 - 1);
                }}
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
                disabled={page === totalpages - 3}
                onClick={() => {
                  setpage(page + 1);
                  setpage2(page2 + 1);
                  setpage3(page3 + 1);
                }}
              >
                <img src={Right} alt='' />
              </button>
            </div>
          )}
        </div>
      </div>
      <NavigationDashboardSmall />
    </div>
  );
};
export default AdminManageUserContainer;
