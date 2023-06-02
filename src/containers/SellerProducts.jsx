/* eslint-disable import/no-extraneous-dependencies */
import React , { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import { chairs } from '../assets';

const SellerProducts = () => {
  return (
    <div className='sellingProd'>
      <div className='selllingProd__maintitle text-center pt-10'>
        <p>Manage Products</p>
      </div>
      <div className='sellingProd__subheading flex justify-between items-center my-5 px-8'>
          <div className='sellingProd__subtitle '>
            <p>Products in shop</p>
          </div>
          <div className='sellingProd__createbtn'>
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
        <div className='sellingProd__lists flex justify-around flex-wrap py-7'>
          <div className='sellingProd__card flex   mb-5 '>
            <div className='sellingProd__cardImage flex '>
              <img src={chairs} alt='Product' />
            </div>
            <div className='sellingProd__cardDetails flex grow justify-between flex-col'>
              <div className='sellingProd__cardDetailsPara'>
                <div>
                  <p className='py-3 px-2'>
                    Name:<span> Stock Item</span>
                  </p>
                </div>
                <div>
                  <p className='py-3 px-2'>
                    Price:<span> $$$$$</span>
                  </p>
                </div>
                <div>
                  <p className='py-3 px-2'>
                    Expiry:<span> xx/xx/xx</span>
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
                  <FontAwesomeIcon
                    style={{
                      width: '3rem',
                      height: '3rem'
                    }}
                    icon={faPenToSquare}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='sellingProd__card flex   mb-5 '>
            <div className='sellingProd__cardImage flex '>
              <img src={chairs} alt='Product' />
            </div>
            <div className='sellingProd__cardDetails flex grow justify-between flex-col'>
              <div className='sellingProd__cardDetailsPara'>
                <div>
                  <p className='py-3 px-2'>
                    Name:<span> Stock Item</span>
                  </p>
                </div>
                <div>
                  <p className='py-3 px-2'>
                    Price:<span> $$$$$</span>
                  </p>
                </div>
                <div>
                  <p className='py-3 px-2'>
                    Expiry:<span> xx/xx/xx</span>
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
                  <FontAwesomeIcon
                    style={{
                      width: '3rem',
                      height: '3rem'
                    }}
                    icon={faPenToSquare}
                  />
                </div>
              </div>
            </div>
          </div>
           <div className='sellingProd__card flex   mb-5 '>
            <div className='sellingProd__cardImage flex '>
              <img src={chairs} alt='Product' />
            </div>
            <div className='sellingProd__cardDetails flex grow justify-between flex-col'>
              <div className='sellingProd__cardDetailsPara'>
                <div>
                  <p className='py-3 px-2'>
                    Name:<span> Stock Item</span>
                  </p>
                </div>
                <div>
                  <p className='py-3 px-2'>
                    Price:<span> $$$$$</span>
                  </p>
                </div>
                <div>
                  <p className='py-3 px-2'>
                    Expiry:<span> xx/xx/xx</span>
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
                  <FontAwesomeIcon
                    style={{
                      width: '3rem',
                      height: '3rem'
                    }}
                    icon={faPenToSquare}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='sellingProd__card flex   mb-5 '>
            <div className='sellingProd__cardImage flex '>
              <img src={chairs} alt='Product' />
            </div>
            <div className='sellingProd__cardDetails flex grow justify-between flex-col'>
              <div className='sellingProd__cardDetailsPara'>
                <div>
                  <p className='py-3 px-2'>
                    Name:<span> Iphone 14</span>
                  </p>
                </div>
                <div>
                  <p className='py-3 px-2'>
                    Price:<span> Iphone 14</span>
                  </p>
                </div>
                <div>
                  <p className='py-3 px-2'>
                    Expiry:<span> Iphone 14</span>
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
                  <FontAwesomeIcon
                    style={{
                      width: '3rem',
                      height: '3rem'
                    }}
                    icon={faPenToSquare}
                  />
                </div>
              </div>
            </div>
          </div>
      
        </div>
    </div>
  );
};
export default SellerProducts;