import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiDownArrow } from 'react-icons/bi';
import { AiOutlineClose,AiOutlineUser } from 'react-icons/ai';
import { searchlog, techLogW } from '../assets';
import Button from './Button';
import logOut from '../utils/logOut';
import { useGetAllCategoriesQuery } from '../states/api/apiSlice';
import { currentToken as Auth } from '../states/features/auth/authSlice';
import Input from './Input';
import {
  addCategories,
  addSearchData,
  searchProduct
} from '../states/features/search/searchSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [close, setClose] = useState(false);
  const { token } = useSelector((state) => {
    return state.auth;
  });
  const loggingOut=()=>{
    logOut()
  }
  if (
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/dashboard/users'||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/reset-password') ||
    pathname === '/dashboard/seller'
  )
    return null;
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

  const showCart = () => {
    if(! Auth){ 
       navigate('/unauthorized')
       return;
    }
    document.querySelector('.cart_overlay').style.display =
      'flex';  
  }

  return (
    <div className='navbar py-0 mb-4'>
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
                <Link to='category'>Categories</Link>
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
        <Search />

        {
          token?
         ( <div className='navbar__profile__letter flex justify-center items-center' onClick={viewProfile}>
          <div className='navbar__profile flex justify-center items-center'>
               <div>
                <AiOutlineUser/>
               </div>
            </div>
             <div>
               <BiDownArrow style={{color:'white',width:'1.5rem',height:'1.5rem',paddingLeft:'0.2rem'}}/>
              </div>
           </div>
         )
          : 
          (<div className='navbar__authBtn flex items-center'>
          <div className='navbar__authBtn flex items-center'>
            <div className='flex'>
            <p
                className='inline cursor-pointer'
                onClick={showCart}
              >
                Cart
              </p>
              <Link className='ml-10' to='/signup'>
                <p>Sign up</p>
              </Link>
            </div>
            <Button value='Login' route='/login' className='navBtn' />
            </div> 
        </div>
         )}
  
        {
          token && 
          <div className='navbar__profileView absolute' onMouseLeave={hideprofile} >
          <div>
           <Button route={`/users/${JSON.parse(localStorage.getItem('user')).id}`} className='primary-btn-no-hover-scale' value='Profile'/>
          </div>
          <div>
              <Button
                route='#'
                value='Cart'
                className='primary-btn-no-hover-scale'
                onClick={showCart}
              />
          </div>
          <div>
          <Button route='/login' value='Sign out' className='primary-btn-no-hover-scale' onClick={loggingOut}/>
          </div>
        </div>
        }

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

const Search = () => {
  const { data, isLoading, isError } = useGetAllCategoriesQuery();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.data);
    }
  }, [data]);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: 'Product',
    categoryIds: null,
    price: null,
    size: null,
    page: null
  });

  const navigate = useNavigate();
  return (
    <form className='nav-search2 flex items-center p-0 h-full'>
      <Input
        type='text'
        name='name'
        placeholder='Enter product name...'
        className='py-4 px-6 text-[1.3rem] h-full outline-none border-none outline-transparent focus:border-none rounded-l-[5rem] rounded-r-0'
        style={{
          outline: 'none',
          borderRadius: '0 0 5rem 5rem'
        }}
        onChange={(e) => {
          setFormData({ ...formData, name: e.target.value });
        }}
      />
      <select
        className='w-fit text-[1rem] h-full py-4 outline-none border-none rounded-0 border-l-[.2rem] border-l-primary focus:border-none'
        onChange={(e) => {
          setFormData({ ...formData, categoryIds: Number(e.target.value) });
        }}
      >
        <option value={null}>All Categories</option>
        {isLoading ? (
          <option>{isError ? 'Loading...' : 'Categories not found'}</option>
        ) : (
          categories &&
          categories.map((item) => {
            return (
              <option className='px-4' key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })
        )}
      </select>
      <Button
        value='SEARCH'
        className='btn-search2 text-white px-8 flex items-center justify-center border-1/4 border-white bg-primary h-full rounded-r-[5rem] hover:scale-102 p-2.5'
        onClick={(e) => {
          e.preventDefault();
          if (formData.name !== '' && formData.name !== 'Product') {
            dispatch(addSearchData(formData));
            dispatch(searchProduct());
            dispatch(addCategories(categories));
            navigate('/search');
          }
        }}
      />
    </form>
  );
};
export default Navbar;


