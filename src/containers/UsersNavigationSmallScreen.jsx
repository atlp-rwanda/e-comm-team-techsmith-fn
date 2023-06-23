import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logOut from '../utils/logOut';
import DashButton from '../components/DashButton';

const NavigationDashboardSmall = () => {
  // const User= "Admin";

  return (
    <div className='navbar_dashboard_small w-full h-[160px] mt-[60%] bg-white-200'>
      <span>
        <DashButton
          route='/dashboard/profile'
          className='secondary-btn-small '
          onClick={() => {}}
          svg={<FontAwesomeIcon icon='fa-solid fa-user' />}
        />
        <p>Profile</p>
      </span>
      <span>
        <DashButton
          className='current-btn '
          route='/dashboard/accounts'
          onClick={() => {}}
          svg={<FontAwesomeIcon icon='fa-solid fa-users' />}
        />
        <p>Users</p>
      </span>
      <span>
        <DashButton
          className='secondary-btn-small '
          route='/'
          onClick={() => {}}
          svg={<FontAwesomeIcon icon='fa-solid fa-cart-shopping' />}
        />
        <p>Orders</p>
      </span>
      <span>
        <DashButton
          className='secondary-btn-small'
          route='/'
          onClick={() => {}}
          svg={<FontAwesomeIcon icon='fa-solid fa-house' />}
        />
        <p>Home</p>
      </span>
      <span>
        <DashButton
          className='secondary-btn-small '
          route='/login'
          onClick={() => {logOut()}}
          svg={<FontAwesomeIcon icon='fa-solid fa-sign-out' />}
        />
        <p>Logout</p>
      </span>
    </div>
  );
};
export default NavigationDashboardSmall;
