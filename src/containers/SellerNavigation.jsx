import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DashButton from '../components/DashButton';

const SellerNavigationDashbooard = () => {
  return (
    <div className='navbar_dashboard h-screen  bg-white-200'>
      <DashButton
        value='Collection'
        route='/dashboard/profile'
        className='secondary-btn mt-20 '
        onClick={() => {}}
        svg={<FontAwesomeIcon icon='fa-solid fa-shop' />}
      />
      <DashButton
        value='Products'
        className='secondary-btn  '
        route='/dashboard/accounts'
        onClick={() => {}}
        svg={<FontAwesomeIcon icon='fa-solid fa-bag-shopping' />}
      />
      <DashButton
        value=' Orders'
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
        onClick={() => {}}
        svg={<FontAwesomeIcon icon='fa-solid fa-sign-out' />}
      />
    </div>
  );
};
export default SellerNavigationDashbooard;
