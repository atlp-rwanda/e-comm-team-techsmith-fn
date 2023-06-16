import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiDownArrow } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { searchlog, techLogW } from '../assets';
import Button from './Button';
import checkIsLogged from '../utils/isLoggedin';
import logOut from '../utils/logOut';

const Navbar = () => {
  const { pathname } = useLocation();
  const [close, setClose] = useState(false);
  const { token } = useSelector((state) => {
    return state.auth;
  });
  if (
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/dashboard/users' ||
    pathname.startsWith('/signup')
  )
    return null;
  const credentials = checkIsLogged();
  const changeIcon = () => {
    document.querySelector('.navbar__dropdown').classList.toggle('rm');
    setClose((prevState) => {
      return !prevState;
    });
  };
  const viewProfile = () => {
    document.querySelector('.navbar__profileView').classList.toggle('visible');
  };
  const hideprofile = () => {
    document.querySelector('.navbar__profileView').classList.remove('visible');
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
                <Link to='categories'>Categories</Link>
              </li>
              <li>
                <Link to='contact'>Contact us</Link>
              </li>
              <li>
                <Link to='about'>About us</Link>
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

        {token ? (
          <div
            className='navbar__profile__letter flex justify-center items-center'
            onClick={viewProfile}
          >
            <div className='navbar__profile flex justify-center items-center'>
              <div>
                <p>{credentials.profileName}</p>
              </div>
            </div>
            <div>
              <BiDownArrow
                style={{
                  color: 'white',
                  width: '1.5rem',
                  height: '1.5rem',
                  paddingLeft: '0.2rem'
                }}
              />
            </div>
          </div>
        ) : (
          <div className='navbar__authBtn flex items-center'>
            <div className='flex'>
              <p
                className='inline cursor-pointer'
                onClick={() => {
                  document.querySelector('.cart_overlay').style.display =
                    'flex';
                }}
              >
                Cart
              </p>
              <Link className='ml-10' to='/signup'>
                <p>Sign up</p>
              </Link>
            </div>
            <Button value='Login' route='/login' className='navBtn' />
          </div>
        )}

        {token && (
          <div
            className='navbar__profileView absolute'
            onMouseLeave={hideprofile}
          >
            <div>
              <Button
                route={`/users/${credentials.id}`}
                className='primary-btn-no-hover-scale'
                value='Profile'
              />
            </div>
            <div>
              <Button
                route='/login'
                value='Sign out'
                className='primary-btn-no-hover-scale'
                onClick={logOut}
              />
            </div>
          </div>
        )}

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
