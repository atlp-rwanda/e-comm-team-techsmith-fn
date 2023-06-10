import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { searchlog, techLogW } from '../assets';
import Button from './Button';

const Navbar = () => {
  const { pathname } = useLocation();
  const [close, setClose] = useState(false);
  if (
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/dashboard/users'||
    pathname.startsWith('/signup/')
  )
    return null;
  const changeIcon = () => {
    document.querySelector('.navbar__dropdown').classList.toggle('rm');
    if (!close) {
      return setClose(true);
    }
    return setClose(false);
  };
  return (
    <div className='navbar'>
      <div className='navbar_logoContainerNavbar-menuList flex justify-around items-center'>
        <section className='navbar_logoContainer'>
          <Link to='/'>
            <img
              src={techLogW}
              alt='Techmisth large logo'
              style={{
                cursor: 'pointer'
              }}
            />
          </Link>
        </section>
        <div className='navbar-allMenuPro  flex justify-between items-center'>
          <div>
            <ul className='flex  items-center '>
              <li>
                <NavLink activeclassname='active' to='categories'>
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink activeclassname='active' to='contact'>
                  Contact us
                </NavLink>
              </li>
              <li>
                <NavLink activeclassname='active' to='about'>
                  About us
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className='navbar-searchbtnSearchbtnLogo flex items-center relative'>
          <div className='navbar-searchButton'>
            <input
              type='text'
              placeholder='Search...'
              className='buttonSearch'
            />
          </div>
          <div className='searchbtnLogo absolute '>
            <img src={searchlog} alt='' />
          </div>
        </div>

        <div className='navbar__authBtn flex items-center'>
          <div>
            <Link to='/signup'>
              <p>Sign up</p>
            </Link>
          </div>
          <Button value='Login' route='/login' className='navBtn ' />
        </div>
        <button className='menuIcon' onClick={changeIcon}>
          {close ? (
            <AiOutlineClose style={{ color: 'white' }} />
          ) : (
            <GiHamburgerMenu style={{ color: 'white' }} />
          )}
        </button>

        <div className='navbar__dropdown rm flex justify-end flex-col'>
          <ul className='flex justify-end flex-col'>
            <li className='navbar__dropdown_search'>
              <div className='navbar__dropdown_input'>
                <input
                  type='text'
                  placeholder='Search...'
                  className='buttonSearchResp'
                />
              </div>
              <div className='navbar__dropdown_input_Img'>
                <img
                  src={searchlog}
                  alt='searchImage'
                  className='navbar__dropdown_input_Icon'
                />
              </div>
            </li>
            <li>Category</li>
            <li>About </li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
