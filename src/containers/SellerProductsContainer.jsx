import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCloseCircle,AiFillDelete } from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import Button from '../components/Button';
import { loading, Left, Right } from '../assets';
import {
  fetchingMyCollection,
  fetchingOneItem
} from '../states/features/seller/sellerSlice';
import { successNotification,ErrorNotification } from '../components/Notification';
import SellerNavigationDashbooard from './SellerNavigation';
import { useDeleteProductMutation } from "../states/api/apiSlice";




const SellerProductsContainer = () => {
  const [poping, setpoping] = useState(false);
  const [items,setItem] = useState('');
  const [dialog, setDialog] = useState(false)
  const dispatch = useDispatch();
  const { isPending, myCollection, totalpages} =
    useSelector((state) => {
      return state.seller;
    });
  const getProduct = (id) => {
    setpoping(true);
    const oneItem = myCollection.filter((oneProduct, index) => {
      return id === index;
    })
    setItem(oneItem)
    idProductRef.current = oneItem[0].id;
    return oneItem
  }; 

  const navigate = useNavigate();

  const [deleteProduct, { isError }] = useDeleteProductMutation();
  const idProductRef = useRef()
  const handleDialog = () => {
    setDialog(true)
  }

  const handleDelete = (id) => {
    handleDialog(true);
    deleteProduct({ productId: id })
    if(!isError){
      setpoping(false)
      successNotification('Successfully deleted the product!')
      dispatch(fetchingMyCollection(page));
    }  
    else{
      ErrorNotification('Error in deleting the product!');
    }
  };


  
  const [page, setpage] = useState(1);
  const [page2, setpage2] = useState(2);
  const [page3, setpage3] = useState(3);
  useEffect(() => {
    dispatch(fetchingMyCollection(page));
    dispatch(fetchingOneItem(1067));
  }, [page]);

  return (
    <div className='sellingProd flex '>
      <SellerNavigationDashbooard />
      <div className='selllingProd__maintitle text-center pt-10 flex-col w-[100%] bg-[#f1f1f1]'>
        <p className='text-2xl font-semibold'>Manage Products</p>
        <div className='sellingProd__subheading flex justify-between items-center my-5 px-24 '>
          <div className='sellingProd__subtitle '>
            <p className='text-xl font-medium'>Products in shop</p>
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
              onClick={() => {
                navigate('/seller/add-product')
              }}
              
              className='py-3 px-7 primary-btn '
            />
          </div>
        </div>
        {poping && (
          <div className='singleProd_background flex fixed top-0 right-0 left-0 bottom-0  items-center justify-center bg-black bg-opacity-50'>
            <div className='sellingProd__singleView absolute top-[30%] left-[30%] bg-slate-50 border  w-[55%] pb-8 flex flex-row drop-shadow-md px-16'>
                <div className="close_responsive justify-end">
                  <button className='' onClick={()=>{return setpoping(false)}}> 
                  <AiOutlineCloseCircle />
                  </button>
                </div>
              <div className='imageField w-[50%] flex flex-row justify-around items-center pr-4'>
                <div className='four_img flex flex-col items-center justify-center'>
                  <img
                    className='w-[40px] h-[70px] mt-[5px] drop-shadow-md  border  bg-white'
                    src={items[0].image[3]}
                    alt=''
                  />
                  <img
                    className='w-[40px] h-[70px] mt-[5px] drop-shadow-md border  bg-white'
                    src={items[0].image[2]}
                    alt=''
                  />
                  <img
                    className='w-[40px] h-[70px] mt-[5px] drop-shadow-md border  bg-white'
                    src={items[0].image[1]}
                    alt=''
                  />
                </div>
                <div className='flex items-center'>
                  <img
                  className='w-[270px] h-[200px] drop-shadow-md  bg-white'
                  src={items[0].image[0]}
                  alt=''
                />
                </div>
              </div>
              <div className='details flex flex-col w-[50%]  '>
              <div className="close flex justify-end p-[20px]">
                  <button onClick={()=>{return setpoping(false)}}> 
                  <AiOutlineCloseCircle />
                  </button>
                </div>
                <div className='inputField text-start h-[65%]'>
                <p className='mx-4'>Name: <span>{items[0].name}</span></p>
                <p className='mx-4'>Stock: <span>{items[0].quantity}</span></p>
                <p className='mx-4'>Price: <span>{items[0].price}</span></p>
                <p className='mx-4'>Expiry Date: <span>{items[0].expiryDate}</span></p>
                <p className='mx-4'>Description: <br /><span>{items[0].description}</span></p>
                </div>
                <div className= 'details_icons flex'>
                  <div onClick={() => {
                    return setDialog(true)
                  }}>
                    <AiFillDelete 
                    style={{
                      color:'red',
                  }}/>
                  </div>
                  {dialog && (
              <div className='dialogBox flex fixed top-0 right-0 left-0 bottom-0  items-center justify-center bg-black bg-opacity-30'>
              <div className='deleteBody flex flex-col bg-white  items-center justify-center h-[20rem] w-[25rem] rounded-[20px] shadow-lg '>
                <h1 style={{
                  color: '#111',
                  fontSize: '2rem',
                  padding: '1rem'
                }}>Are you sure you want to delete this item?</h1>
                <div className='delete flex items-center gap-4' style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
                  <div className='deleteBtn'>
                    <Button
                      value='Delete'
                      className='w-fit py-4 px-6 primary-btn normal-case hover:bg-red-700'
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(items[0].id)
                      }}
                    />
                  </div>
                  <div className='cancelBtn bg-white'>
                    <Button
                      value='Cancel'
                      className='w-fit py-4 px-6 primary-btn normal-case'
                      style={{
                        marginLeft: '.7em',
                      }}
                      onClick={() => { setDialog(false); }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )};
                </div>
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

          {/* Product in my collection */}
          {myCollection?.map((product, index) => {
            return (
              <div key={product.id} className='sellingProd__card flex  mb-5 '
              onClick={() => {
                return getProduct(index);
              }}>
                <div className='sellingProd__cardImage flex '>
                  <img src={product.image[0]} alt='Product' />
                </div>
                <div className='sellingProd__cardDetails flex grow justify-between flex-col'>
                  <div className='sellingProd__cardDetailsPara'>
                    <div>
                      <p className='flex justify-start items-center pl-[10px] py-4'>
                        <span> {product.name}</span>
                      </p>
                    </div>
                    <div>
                      <p className='flex justify-start items-center pl-[10px] py-4'>
                        $<span> {product.price}</span>
                      </p>
                    </div>
                    <div>
                      <p className='flex justify-start items-center pl-[10px] py-4'>
                        Exp:<span> {product.expiryDate}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {!isPending && (
            <div className='pagination justify-center pt-6'>
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
      <ToastContainer />
    </div>
  );
};
export default SellerProductsContainer;
