import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          <div className='table_titles p-0 pl-10 grid gap-0  '>
            <span className='flex justify-center max-w-[150px]'>
              <p>Profile</p>
            </span>
            <span className='max-w-[150px] username'>
              <p>Name</p>
            </span>
            <span className=''>
              <p>Email</p>
            </span>
            <span className='max-w-[24rem] userdate '>
              <p>Subscription Date</p>
            </span>
            <span className='flex justify-center  '>
              <p>Role</p>
            </span>
            <span className='flex justify-center '>
              <p>Actions</p>
            </span>
          </div>

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
          {{ userList } && (
            <div>
              <Userlist userList={userList} />
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
