/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React  from 'react';
import { useLocation } from 'react-router-dom';
import { searchLogom ,profile,techLogW } from '../assets';


const Navbar = () => {
  const { pathname } = useLocation();
  if (pathname === '/login') return null;
  const mouseHover = ()=>{
    const nav = document.querySelector('.navbar_logoContainerNavbar-menuList')
    nav.classList.remove('items-center')
    nav.classList.add('items-start')
  }
  const mouseLeave = ()=>{
    const nav = document.querySelector('.navbar_logoContainerNavbar-menuList')
    nav.classList.remove('items-start')
    nav.classList.add('items-center')
  }
  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div className='navbar' >  
    <div className='navbar_logoContainerNavbar-menuList flex justify-around items-center'> 
      <section className='navbar_logoContainer'>
        <img
          src={techLogW}
          alt='Techmisth large logo'
          style={{
            maxWidth: '15rem',
            cursor: 'pointer'
          }}
        />
      </section>
      <div className='navbar-menuList'>
        <ul className='flex  items-start '> 
          <li className='navbar-category-submenu' onMouseOver={mouseHover} onMouseLeave={mouseLeave}>
            <a href='news'>Category</a>
            <ul id='#categorySubmenu' className='categoryclass hidden '>
              <li><a href='#iphone'>iphone12</a></li>
              <li><a href='#mac'>MacIOS</a></li>
              <li><a href='#samsung'>SamsungTv</a></li>
            </ul>
          </li>
          <li className='navbar-contact-submenu' onMouseOver={mouseHover} onMouseLeave={mouseLeave}>
            <a href='#contact'>Contact us</a>
            <ul id='#contctSubmenu' className='contactClass hidden pl-3'>
              <li><a href='#deal'>techmisth@gmail.com</a></li>
              <li><a href='#deal'>+250 789 076 580</a></li>
            </ul>
          </li>
          <li className='navbar-about-submenu' onMouseOver={mouseHover} onMouseLeave={mouseLeave}>  
            <a href='#about' >About us</a>
            <ul id='#AboutSubmenu' className='aboutClass hidden pl-3'>
              <li><a href='#deal'>new Books and media</a></li>
              <li><a href='#deal'>Home appliences</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div className='navbar-searchbtnSearchbtnLogo flex items-center relative'>
      <div className='navbar-searchButton'>
      <input type= 'text' placeholder ='Search...' className='buttonSearch' /> 
      </div>
      <div className='searchbtnLogo absolute '>
       <img src={searchLogom} alt='' />
       </div>
       </div>
       <div className='searchbtnLogoProfileText'> 
      <div className='profileIcon'>
       <img src={profile} alt='' />
       </div>
       <nav className='navbar-profile'>
        <ul className='navbar-profileMenu'>
        <li><a href='#HomeContainer'>Profile</a>
       <ul id='navbar-Psubmenu'>
        <li> <a href='#dashboard'>Dashboard</a> </li>
        <li> <a href='#notification'>Notification</a> </li>
        <li> <a href='#Chat'>Chat</a></li>
        <li> <a href='#signUp'>SignUp</a></li>
        <li> <a href='#login'>Login</a></li>
       </ul>
       </li>
        </ul>
       </nav>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
