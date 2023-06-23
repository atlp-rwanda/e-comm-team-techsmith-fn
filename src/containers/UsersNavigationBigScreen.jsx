import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logOut from '../utils/logOut';

import DashButton from '../components/DashButton';

const NavigationDashbooard = () => {
  return (
    <div className='navbar_dashboard h-screen  bg-white-200'>
      <DashButton
        value='Profile'
        route='/dashboard/profile'
        className='secondary-btn mt-20 '
        onClick={() => {}}
        svg={<FontAwesomeIcon icon='fa-solid fa-user' />}
      />
      <DashButton
        value='Users'
        className='secondary-btn  '
        route='/dashboard/accounts'
        onClick={() => {}}
        svg={<FontAwesomeIcon icon='fa-solid fa-users' />}
      />
      <DashButton
        value='Orders'
        route='/'
        onClick={() => {}}
        svg={<FontAwesomeIcon icon='fa-solid fa-cart-shopping' />}
      />
      <DashButton
        className='secondary-btn '
        value='Home'
        route='/'
        onClick={() => {}}
        svg={<FontAwesomeIcon icon='fa-solid fa-house' />}
      />

      <DashButton
        className='secondary-btn mt-[300px] '
        value='Logout'
        route='/login'
        onClick={() => {logOut()}}
        svg={<FontAwesomeIcon icon='fa-solid fa-sign-out' />}
      />
    </div>
  );
};
export default NavigationDashbooard;
