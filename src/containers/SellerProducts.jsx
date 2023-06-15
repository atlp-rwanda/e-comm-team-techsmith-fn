/* eslint-disable*/
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPenToSquare,
  faTrash,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import { chairs, loading, Left, Right } from '../assets';
import {
  fetchingMyCollection,
  fetchingOneItem
} from '../states/features/seller/sellerSlice';
import SellerNavigationDashbooard from './SellerNavigation';
import Input from '../components/Input';
// import Pagination from '../components/Pagination';

const SellerProducts = () => {
  const [poping, setpoping] = useState(false);
  const dispatch = useDispatch();
  const { isPending, myCollection, networkError, totalpages, item } =
    useSelector((state) => {
      return state.seller;
    });
  const getProduct = (id) => {
    console.log(id);
    setpoping(true);
    dispatch(fetchingOneItem(id));
    console.log(item);
  };

  const [page, setpage] = useState(1);
  const [page2, setpage2] = useState(2);
  const [page3, setpage3] = useState(3);
  useEffect(() => {
    dispatch(fetchingMyCollection(page));
    dispatch(fetchingOneItem(1067));
    console.log(myCollection);
  }, [page]);

  return (
    <div className='sellingProd flex '>
      <SellerNavigationDashbooard />
      <div className='selllingProd__maintitle text-center pt-10 flex-col w-[100%] bg-[#f1f1f1]'>
        <p className='text-xl'>Manage Products</p>
        <div className='sellingProd__subheading flex justify-between items-center my-5 px-8 '>
          <div className='sellingProd__subtitle '>
            <p>Products in shop</p>
          </div>
          <div className='sellingProd__createbtn '>
            <Button
              value={
                <span className='button_with_icon'>
                  Create{' '}
                  <FontAwesomeIcon
                    style={{
                      width: '2rem',
                      height: '2rem'
                    }}
                    icon={faPlus}
                  />
                </span>
              }
              className='py-3 px-7 primary-btn '
            />
          </div>
        </div>
        {poping && (
          <div className='absolute top-[30%] left-[30%] bg-slate-50 border  w-[55%] h-[45%] flex flex-row drop-shadow-md'>
            <div className='imageField w-[50%] flex flex-row justify-around items-center pr-4'>
              <div className='flex flex-col items-center '>
                <img
                  className='w-[40px] h-[70px] mt-[5px] drop-shadow-md  border  bg-white'
                  src={item.image[3]}
                  alt=''
                />
                <img
                  className='w-[40px] h-[70px] mt-[5px] drop-shadow-md border  bg-white'
                  src={item.image[2]}
                />
                <img
                  className='w-[40px] h-[70px] mt-[5px] drop-shadow-md border  bg-white'
                  src={item.image[1]}
                />
              </div>
              <img
                className='w-[170px] h-[200px] drop-shadow-md  bg-white '
                src={item.image[0]}
              />
            </div>
            <div className='flex flex-col w-[50%]  '>
            <div className="close flex justify-end pr-[10px]">
                <button onClick={()=>{return setpoping(false)}}> 
                 <AiOutlineCloseCircle />
                </button>
              </div>
              <div className='inputField flex flex-col h-[65%] justify-around mt-[20px]'>
                <TextField className='inputProduct' id='standard-basic' label='Name' value={item.name} variant='standard' />
                <TextField className='inputProduct' id='standard-basic' label='In stock' value={item.quantity} variant='standard' />
                <TextField className='inputProduct' id='standard-basic' label='Price' value={item.price} variant='standard' />
                <TextField className='inputProduct' id='standard-basic' label='Description' value={item.description} variant='standard' />
              </div>
              <div className="edit flex flex-col  pr-[10px]">
                <button onClick={()=>{return setpoping(false)}}> 
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                Edit
              </div>
            </div>
          
         
          </div>
        )}
        <div className='sellingProd__lists flex  justify-around flex-wrap py-7'>
          {isPending && (
            <div className='loading_div flex justify-center z-10'>
              Loading...
              <img src={loading} alt='' />
            </div>
          )}

          {networkError && (
            <div className='loading_div flex justify-center w-[84%] '>
              Server or Network Error{' '}
              <FontAwesomeIcon icon='fa-solid fa-exclamation-circle' />
            </div>
          )}

          {/* Product in my collection */}
          {myCollection?.map((product) => {
            return (
              <div key={product.id} className='sellingProd__card flex  mb-5 '>
                <div className='sellingProd__cardImage flex '>
                  <img src={product.image[0]} alt='Product' />
                </div>
                <div className='sellingProd__cardDetails flex grow justify-between flex-col'>
                  <div className='sellingProd__cardDetailsPara'>
                    <div>
                      <p className='h-20 flex justify-start items-center pl-[10px]'>
                        Name: <span> {product.name}</span>
                      </p>
                    </div>
                    <div>
                      <p className='h-20 flex justify-start items-center pl-[10px]'>
                        Price: <span> {product.price}</span>
                      </p>
                    </div>
                    <div>
                      <p className='h-20 flex justify-start items-center pl-[10px]'>
                        Expiry: <span> {product.expiryDate}</span>
                      </p>
                    </div>
                  </div>

                  <div className='sellingProd__editIcons flex justify-around content-center'>
                    <div>
                      <FontAwesomeIcon
                        style={{
                          width: '3rem',
                          height: '3rem'
                        }}
                        icon={faTrash}
                      />
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          return getProduct(product.id);
                        }}
                      >
                        <FontAwesomeIcon
                          style={{
                            width: '3rem',
                            height: '3rem'
                          }}
                          icon={faPenToSquare}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* {!isPending && <Pagination pages={page} totalpages={totalpages}/>} */}
          {!isPending && (
            <div className='pagination justify-center'>
              <button
                type='submit'
                className='pagination-btn'
                onClick={() => {
                  setpage(page - 1);
                  setpage2(page2 - 1);
                  setpage3(page3 - 1);
                  if (page2 === '...') {
                    setpage2(totalpages);
                    setpage3('...');
                  }
                  if (page3 === '...' && page2 === totalpages) {
                    setpage3(totalpages);
                  }
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
                disabled={page === totalpages}
                onClick={() => {
                  setpage(page + 1);
                  if (page2 === totalpages) {
                    setpage2('...');
                  } else {
                    setpage2(page2 + 1);
                  }
                  if (page3 === totalpages || page3 === '...') {
                    setpage3('...');
                  } else {
                    setpage3(page3 + 1);
                  }
                }}
              >
                <img src={Right} alt='' />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SellerProducts;
