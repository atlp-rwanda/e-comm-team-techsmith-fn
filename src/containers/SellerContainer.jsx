import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  useCreateProductMutation,
  useGetAllCategoriesQuery
} from '../states/api/apiSlice';
import Button from '../components/Button';
import Loading from '../components/Loading';
import { setCategories } from '../states/features/categories/categorySlice';

const SellerContainer = () => {
  const [formData, setFormData] = useState({
    condition: '',
    categoryId: ''
  });

  const dispatch = useDispatch();

  const categories = useSelector((state) => {
    return state.categories.categories;
  });

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isSuccess: categoriesSuccess,
    isError: categoriesError
  } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (categoriesSuccess) {
      dispatch(setCategories(categoriesData.data));
    }
  }, [categoriesData]);

  const { register, handleSubmit } = useForm();

  const fileUploader = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const [createProduct, { isLoading, isSuccess, isError }] =
    useCreateProductMutation();
  const addProduct = async (productData) => {
    const { image: uploadImages } = productData;
    const image = await Promise.all(
      Array.from(uploadImages).map((file) => {
        return fileUploader(file);
      })
    );
    const modifiedData = {
      ...productData,
      image
    };
    createProduct(modifiedData);
  };

  const inputClassName =
    'w-11/12 px-8 py-4 text-sm outline-none border-primary rounded-[.5rem]';

  return (
    <div className='containerSeller'>
      <h1 className='sellerPageTitle my-4 text-[3rem] text-primary font-black'>
        Manage product
      </h1>
      <form onSubmit={handleSubmit(addProduct)} className='sellerForm'>
        <div className='input-row'>
          <div className='input-group'>
            <label htmlFor='productName'>
              Names
              <input
                className={inputClassName}
                type='text'
                id='productName'
                name='productName'
                required
                placeholder='Name of the product'
                {...register('name', {
                  required: 'name of product is required'
                })}
              />
            </label>
          </div>
          <div className='input-group'>
            <label htmlFor='productCategory'>
              Category
              <select
                required
                className='w-11/12 px-8 py-4 text-[1.1rem] h-full outline-none rounded-[.5rem]'
                id='category'
                {...register('categoryId', {
                  onChange: (e) => {
                    setFormData({ ...formData, categoryId: e.target.value });
                  },
                  valueAsNumber: true
                })}
              >
                {categoriesLoading ? (
                  <option value={null}>Loading...</option>
                ) : categoriesError ? (
                  <option value={null}>No categories</option>
                ) : (
                  categories.map((category) => {
                    return (
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    );
                  })
                )}
              </select>
            </label>
          </div>
        </div>
        <div className='input-row'>
          <div className='input-group'>
            <label htmlFor='productQuantity'>
              Quantity
              <input
                className={inputClassName}
                type='text'
                id='quantity'
                required
                name='quantity'
                {...register('quantity', {
                  required: 'Quantity of product is required',
                  valueAsNumber: true
                })}
              />
            </label>
          </div>
          <div className='input-group'>
            <label htmlFor='productPrice'>
              Price per product
              <input
                className={inputClassName}
                type='text'
                id='productPrice'
                required
                name='productPrice'
                {...register('price', {
                  required: 'Price of product is required',
                  valueAsNumber: true
                })}
              />
            </label>
          </div>
        </div>
        <div className='input-row'>
          <div className='input-group'>
            <label htmlFor='ProductCondition'>
              Condition
              <select
                className='w-11/12 px-8 py-5 text-[1.1rem] h-full outline-none rounded-[.5rem]'
                required
                id='condition'
                {...register('condition', {
                  onChange: (e) => {
                    setFormData({ ...formData, condition: e.target.value });
                  }
                })}
              >
                <option value='New'>New</option>
                <option value='Used'>Used</option>
              </select>
            </label>
          </div>
          <div className='input-group'>
            <label htmlFor='dateOfExpiration'>
              Expiration Date
              <input
                className={inputClassName}
                type='date'
                id='dateOfExpiration'
                required
                placeholder='Name of the product'
                name='dateOfExpiration'
                style={{
                  fontSize: '1.1rem'
                }}
                {...register('expiryDate', {
                  required: 'Expiration date of the product is required',
                  setValueAs: (value) => {
                    return moment(value).format('YYYY-MM-DDTHH:mm:ssZ');
                  }
                })}
              />
            </label>
          </div>
        </div>
        <div className='input-row'>
          <div className='input-group'>
            <label htmlFor='productDescription'>
              Description
              <textarea
                id='productDescription'
                required
                className='description w-11/12 px-8 py-4 text-[1.5rem] outline-none rounded-[.5rem]'
                placeholder='Description of the product'
                name='productDescription'
                {...register('description', {
                  required: 'Product description is required'
                })}
              />
            </label>
          </div>
          <div className='input-group h-full'>
            <label htmlFor='productImage h-full flex flex-col text-sm'>
              Upload images
              <span className='h-[10rem] flex flex-col items-start justify-center'>
                <input
                  className={inputClassName}
                  multiple
                  style={{
                    fontSize: '1.1rem'
                  }}
                  type='file'
                  name='productImage'
                  {...register('image', {
                    required: 'Image of product is required'
                  })}
                />
              </span>
            </label>
          </div>
        </div>
        <div className='add_product_feedbacks mx-auto w-full flex flex-col items-center my-8'>
          <p
            className='text-base text-green-500 hidden'
            style={
              isSuccess && !isError
                ? {
                    display: 'block'
                  }
                : {
                    display: 'none'
                  }
            }
          >
            Product created successfully
          </p>
          <p
            className='text-base text-red-700 hidden'
            style={
              isError && !isSuccess
                ? {
                    display: 'block'
                  }
                : {
                    display: 'none'
                  }
            }
          >
            Error creating product
          </p>
        </div>
        <div className='containerButton'>
          <Button
            input
            value={isLoading ? <Loading width={50} /> : 'Create Product'}
            className='primary-btn py-4 px-8 w-fit'
          />
        </div>
      </form>
    </div>
  );
};
export default SellerContainer;
