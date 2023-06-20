import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import Loading from '../components/Loading'
import HomeCategoryProductCard from '../components/HomeCategoryProductCard';
import {
  useGetAllCategoriesQuery,
  useLazyGetAllProductsQuery,
  useLazyGetProductsCategoryQuery
} from '../states/api/apiSlice';
import { setCategories, setCategoryProducts } from '../states/features/categories/categorySlice';
import { getCatName } from '../utils/categories';

const ViewAllProductsContainer = () => {
  const [getAllProducts] = useLazyGetAllProductsQuery();
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const categoryProducts = useSelector((state) => {return state.categories.products});
  const {
    data: categories,
    isSuccess
  } = useGetAllCategoriesQuery();

  useEffect(() => {
    const size = 20;
    const page = 1;
    getAllProducts({ size, page })
      .then(({ data }) => {
        setProducts(data.data.products);
      })
      .catch((err) => {
        return err
      });
  }, []);

  useEffect(() => {
    setProducts([...categoryProducts]);
  }, [categoryProducts]);

  useEffect(() => {
    if(isSuccess) {
      setProductCategories(categories.data);
    }
  }, [categories]);

  return (
    <div>
      <div className='category_section px-10 '>
        <Categories />
        <div>
          <div className='home_browse_category_container flex flex-wrap justify-around'>
       {products.map((item) => {
        return (
          <HomeCategoryProductCard
          image={item.image[randomImage(item.image.length)]}
          key={item.id}
            description={item.description}
            name={item.name}
            category={getCatName(item.categoryId, productCategories)}
            price={item.price}
            quantity={item.quantity}
          />
        );
      })}
          </div>
        </div>
      </div>
      <RevisitCollections />
    </div>
  );
};

export default ViewAllProductsContainer;

const Categories = () => {
  const {
    data: categories,
    isLoading,
    isError,
    isSuccess
  } = useGetAllCategoriesQuery();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const dispatch = useDispatch();

  const [getProductsCategory] = useLazyGetProductsCategoryQuery();

  useEffect(() => {
    if(isSuccess) {
      setCategories(categories.data);
    }
  }, [categories]);

  if (isLoading) {
    return <div className='w-full max-w-[100%] min-w-[50%] min-h-[100vh] flex items-center justify-center'><Loading width={50} /></div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (isSuccess) {
    return (
      <div className='flex flex-col p-8 w-full max-w-[20%] items-start gap-8'>
        <h1 className='category_title text-left text-[2.5rem] font-bold'>All Categories</h1>
        {categories.data.map((category) => {
          const { id, name } = category;
          const isSelected = selectedCategoryId === id;
          return (
            <div
              key={id}
              className='category_container flex items-center gap-4 text-[1.6rem]'
            >
              <input
                type='checkbox'
                className='cursor-pointer w-6 h-6 text-blue-600 border-gray-300 rounded focus:text-primary dark:focus:ring-blue-600 focus:ring-2'
                onClick={() => {
                  if (isSelected) {
                    setSelectedCategoryId(null);
                  }else{
                  const size = 20;
                  const page = 1;
                  getProductsCategory({ categoryId: id, size, page })
                    .then(({ data: categoryProducts}) => {
                      dispatch(setCategoryProducts(categoryProducts.data.rows));
                      setCategories(categories.data);
                      setSelectedCategoryId(id);
                    })
                    .catch((err) => {
                      return err
                    });
                  }
                }}
                checked={isSelected}
              />
              <label htmlFor='' className='text-[1.6rem]'>
                {name}
              </label>
            </div>
          );
        })}
      </div>
    );
  }

  if (isError) {
    return <div className='h-[80vh] flex flex-col items-center justify-center'>
    <h1 className='text-[5rem] text-primary'>Could not fetch products</h1>
  </div>
  }

  return null;
};

// REVISIT YOUR COLLECTIONS
const RevisitCollections = () => {
  return (
    <div className='home_revisit_collections py-[10rem]'>
      <section className='home_revisit_collections_header'>
        <h3>Revisit your collection</h3>
        <p>We keep your screenshots</p>
      </section>
      <section className='home_revisit_collections_cta'>
        <Button
          className='primary-btn home_revisit_collections_button'
          value={
            <span className='button_with_icon'>
              Go to cart{' '}
              <FontAwesomeIcon
                style={{
                  width: '3rem',
                  height: '3rem'
                }}
                icon={faCartShopping}
              />
            </span>
          }
        />
        <Button
          className='primary-btn home_revisit_collections_button'
          value={
            <span className='button_with_icon'>
              Go to your wishlist{' '}
              <FontAwesomeIcon
                style={{
                  width: '3rem',
                  height: '3rem'
                }}
                icon={faHeart}
              />
            </span>
          }
        />
      </section>
    </div>
  );
};

const randomImage=(size)=>{
  return(Math.floor(Math.random() * size))
}