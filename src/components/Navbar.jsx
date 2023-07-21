import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BsCheckCircle } from 'react-icons/bs';
import { IoIosNotificationsOutline } from 'react-icons/io';
import {
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineCloseCircle
} from 'react-icons/ai';
import { techLogW } from '../assets';
import Button from './Button';
import logOut from '../utils/logOut';
import Loading from './Loading';
import { useGetAllCategoriesQuery } from '../states/api/apiSlice';
import { currentToken as Auth, reset } from '../states/features/auth/authSlice';
import Input from './Input';
import { successNotification } from './Notification';
import {
  addCategories,
  addSearchData,
  searchProduct
} from '../states/features/search/searchSlice';
import {
  fetchingAllNotification,
  fetchingAllUnreadNotification,
  deleteSingleNotification,
  readSingleNotification,
  markNotificationAsRead
} from '../states/features/seller/sellerSlice';
import { removeDuplicates } from '../utils/Arrays';
import { socket } from '../socket';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [close, setClose] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isEmpty2, setIsEmpty2] = useState(false);
  const [currentNotifications, setNotifications] = useState([]);
  const [currentUnreadNotifications, setUnreadNotifications] = useState([]);
  const [notify, setNotify] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const { isLoading, notifications, unreadNotifications, newUnread, message } =
    useSelector((state) => {
      return state.seller;
    });
    const google=localStorage.getItem('googleLogin')
    if(google){
      localStorage.removeItem('googleLogin')
      window.location.reload()
    }
  useEffect(() => {
    displayNotifications();
  }, [newUnread, message]);

  const displayNotifications = () => {
    if (localStorage.getItem('isSeller')) {
      setIsSeller(true);
      dispatch(fetchingAllNotification());
      dispatch(fetchingAllUnreadNotification());
      setNotifications(removeDuplicates(notifications));
      setUnreadNotifications(removeDuplicates(unreadNotifications));
      if (newUnread === 0 || newUnread === undefined) {
        setIsEmpty2(true);
      } else {
        setIsEmpty2(false);
      }
      if (notifications === undefined) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
      }
    } else {
      setIsSeller(false);
    }
  };
  socket.on('createProductSuccess', (data) => {
    successNotification('New Product Created');
    unreadNotifications.push(removeDuplicates(data?.data));
  });
  socket.on('productExpired', (data) => {
    successNotification('Product expired');
    unreadNotifications.push(removeDuplicates(data));
  });
  socket.on('deleteProductSuccess', (data) => {
    successNotification('Product Deleted successfuly');
    unreadNotifications.push(removeDuplicates(data));
  });
  socket.on('updateProductSuccess', (data) => {
    successNotification('Product Updated successfuly');
    unreadNotifications.push(removeDuplicates(data));
  });

  const getAllNotifications = () => {
    setIsActive1(true);
    setIsActive2(false);
    dispatch(fetchingAllNotification());
    setNotifications(notifications);
  };
  const getAllUnreadNotifications = () => {
    setIsActive2(true);
    setIsActive1(false);
    dispatch(fetchingAllUnreadNotification());
    setUnreadNotifications(unreadNotifications);
  };
  const deleteNotif = (id) => {
    dispatch(deleteSingleNotification(id));
    const updatedNotifications = notifications.filter((item) => {
      return item.id !== id;
    });
    setNotifications(updatedNotifications);
  };
  const readOne = (id) => {
    dispatch(readSingleNotification(id));
    const updatedUnreadNotifications = unreadNotifications.filter((item) => {
      return item.id !== id;
    });
    setUnreadNotifications(updatedUnreadNotifications);
    if (unreadNotifications.length === 1) {
      setIsEmpty2(true);
    }
  };
  const clearAll = () => {
    dispatch(markNotificationAsRead());
    dispatch(fetchingAllUnreadNotification());
    setUnreadNotifications([]);
    setIsEmpty2(true);
  };
  const notifyMe = () => {
    setNotify(true);
    dispatch(fetchingAllUnreadNotification());
    dispatch(fetchingAllNotification());
    setNotifications(notifications);
    setUnreadNotifications(unreadNotifications);
    setIsActive1(true);
    setIsActive2(false);
    if (notify) {
      setNotify(false);
    }
  };

  const { token } = useSelector((state) => {
    return state.auth;
  });
  const loggingOut = () => {
    dispatch(reset());
    logOut();
  };
  if (
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/dashboard/users' ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/reset-password') ||
    pathname.startsWith('/wishlist') ||
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
    if (!Auth) {
      navigate('/unauthorized');
      return;
    }
    document.querySelector('.cart_overlay').style.display = 'flex';
  };

  return (
    <div className='mb-12'>
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
              <ul className='flex items-center whitespace-nowrap gap-6'>
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
          <div className='search_container'>
            <Search />
          </div>

          {token ? (
            <div className='w-fit flex items-center gap-6'>
              <div className='nav_cart_container'>
                <Button
                  value={<FontAwesomeIcon icon={faShoppingCart} />}
                  className='primary-btn p-4 rounded-[50%] w-fit'
                  onClick={showCart}
                />
              </div>
              <div
                className='navbar__profile__letter flex justify-center items-center cursor-pointer'
                onClick={viewProfile}
              >
                <div className='navbar__profile flex justify-center items-center cursor-pointer'>
                  <div className='shadow-lg rounded-[50%] bg-white p-2'>
                    <AiOutlineUser />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='navbar__authBtn flex items-center'>
              <div className='navbar__authBtn flex items-center'>
                <div className='flex'>
                  <p className='inline cursor-pointer' onClick={showCart}>
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

          {token && (
            <div>
              <div
                className='navbar__profileView absolute'
                onClick={hideprofile}
              >
                <div>
                  <Button
                    route={`/users/${
                      JSON.parse(localStorage.getItem('user')).id
                    }`}
                    className='primary-btn-no-hover-scale'
                    value='Profile'
                  />
                </div>
                <div>
                  <Button
                    value='Wishlist'
                    className='primary-btn-no-hover-scale'
                    route='/wishlist'
                    onClick={() => {
                      navigate('/wishlist');
                    }}
                  />
                </div>
                <div>
                  <Button
                    value='Orders'
                    className='primary-btn-no-hover-scale'
                    route='/orders'
                    onClick={() => {
                      navigate('/orders');
                    }}
                  />
                </div>
                {!localStorage.getItem('isBuyer') && (
                  <div>
                    <Button
                      route={
                        localStorage.getItem('isSeller')
                          ? `dashboard/seller`
                          : `dashboard/users`
                      }
                      value='Dashboard'
                      className='primary-btn-no-hover-scale'
                    />
                  </div>
                )}
                <div>
                  <Button
                    route='/login'
                    value='Sign out'
                    className='primary-btn-no-hover-scale'
                    onClick={loggingOut}
                  />
                </div>
              </div>
            </div>
          )}
          {isSeller && (
            <div className='notifications-navbar flex flex-end text-white mr-[1rem]'>
              <IoIosNotificationsOutline
                onClick={notifyMe}
                color='white'
                className=' navIcon w-[30px]   hover:animate-wiggle  duration-2000 '
              />
              {currentUnreadNotifications.length}
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
                <Search />
              </li>
              <li>
              <Link to='category'>Categories</Link>
              </li>
              <li>
              <Link to='about'>About us</Link>
               </li>
              <li> 
              <Link to='contact'>Contact us</Link>
              
              </li>
            </ul>
          </div>
        </div>
      </div>
      {notify && (
        <div className='w-full  flex justify-end screen-mid:justify-center'>
          <div className=' w-[30%] screen-mid:w-[70%] fixed  bg-white border border-primary rounded-lg h-[57%] flex flex-col  mr-[5%] screen-mid:mr-[0%] '>
            <div className='bigNotify text-[1.6rem] ml-[2rem] mt-[2rem]'>
              Nofications
            </div>
            <div className='subTitlesNotify text-[1.6rem] w-[100%] ml-[2rem]  flex justify-start mt-[10px] '>
              <button
                style={{ boxShadow: 'none' }}
                onClick={getAllNotifications}
                className={isActive1 ? 'active_notification' : ''}
              >
                View all
              </button>
              <button
                style={{ marginLeft: '2rem', boxShadow: 'none' }}
                onClick={getAllUnreadNotifications}
                className={isActive2 ? 'active_notification' : ''}
              >
                New message
              </button>
            </div>
            <div className='notify overflow-scroll pb-[20px]'>
              {isLoading && <Loading className='mt-[3rem]' />}
              {isActive1 &&
                currentNotifications &&
                currentNotifications?.map((item) => {
                  return (
                    <div
                      key={Math.random()}
                      className='flex flex-col justify-center  '
                    >
                      <div className='flex justify-start items-center w-[full] mt-[1.5rem] '>
                        <div className='notifyText w-full ml-[2rem] mr-[2rem] px-[1rem] border border-bluewishGray rounded'>
                          <div className='flex flex-row justify-between text-primary'>
                            <p className='text-[1.4rem]'>{item.title}</p>
                            <AiOutlineCloseCircle
                              onClick={() => {
                                return deleteNotif(item.id);
                              }}
                              style={{ color: 'red' }}
                            />
                          </div>
                          <p className='text-[1rem] text-bluewishGray'>
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {isActive2 && isEmpty2 && (
                <div className='w-full flex justify-center items-center text-base mt-8'>
                  No new notification found !
                </div>
              )}
              {isActive1 && isEmpty && (
                <div className='w-full flex justify-center items-center text-base mt-8'>
                  No notification found !
                </div>
              )}
              {isActive2 &&
                currentUnreadNotifications &&
                currentUnreadNotifications.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className='flex flex-col justify-center   '
                    >
                      <div className='flex justify-start items-center w-[full] mt-[1.5rem] '>
                        <div className='notifyText w-full ml-[2rem] mr-[2rem] px-[1rem] border border-bluewishGray rounded'>
                          <div className='flex flex-row justify-between text-primary'>
                            <p className='text-[1.4rem]'>{item.title}</p>
                            <BsCheckCircle
                              onClick={() => {
                                return readOne(item.id);
                              }}
                              style={{ color: 'green' }}
                            />
                          </div>
                          <p className='text-[1rem] text-bluewishGray'>
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {isActive2 && !isEmpty2 && (
              <div className='clearUnread flex flex-row justify-end'>
                <Button
                  onClick={clearAll}
                  value='Clear all'
                  className='primary-btn w-[11rem] h-[3.4rem] text-[1.2rem] mt-[1.5rem] mr-[2rem] mb-[1.5rem] '
                />
              </div>
            )}

            {message && <ToastContainer />}
          </div>
        </div>
      )}
      <ToastContainer />
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
    <form className=' divide-white flex items-center h-fit w-full p-0'>
      <Input
        type='text'
        name='name'
        placeholder='Enter product name'
        className='outline-none border-none px-8 text-sm py-5 rounded-none h-fit w-full min-w-[15rem] rounded-l-[5rem] focus:border-none'
        onChange={(e) => {
          setFormData({ ...formData, name: e.target.value });
        }}
      />
      <select
        className='w-full text-[1.2rem] text-black py-5 min-w-[5rem] max-w-[20rem] outline-none border-none h-fit rounded-0 border-l-[.2rem] border-l-primary focus:border-none'
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
        className='text-white px-8 flex items-center py-3 p-4 w-fit justify-center border-[1px] border-white bg-primary rounded-r-[5rem] hover:scale-102 screen-mid:py-5'
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
