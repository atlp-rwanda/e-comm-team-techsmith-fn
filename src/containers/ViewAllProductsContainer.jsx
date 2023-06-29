import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import {
  useGetAllCategoriesQuery,
  useLazyGetAllProductsQuery,
  useLazyGetProductsCategoryQuery
} from '../states/api/apiSlice';
import {
  setCategories,
  setCategoryProducts,
  setProductCategoriesLoading,
  updateSelectedCategory
} from '../states/features/categories/categorySlice';
import { getCatName } from '../utils/categories';

const ViewAllProductsContainer = () => {
  const [getAllProducts] = useLazyGetAllProductsQuery();
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const categoryProducts = useSelector((state) => {
    return state.categories.products;
  });
  const { data: categories, isSuccess } = useGetAllCategoriesQuery();

  const categoryProductsLoading = useSelector((state) => {
    return state.categories.categoryProductsLoading;
  });

  

  useEffect(() => {
    if (categoryProductsLoading) {
      setProductsLoading(true);
    } else {
      setProductsLoading(false);
    }
  }, [categoryProductsLoading]);

  useEffect(() => {
    const size = 20;
    const page = 1;
    getAllProducts({ size, page })
      .then(({ data }) => {
        setProducts(data.data.products);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  useEffect(() => {
    setProducts([...categoryProducts]);
  }, [categoryProducts]);

  useEffect(() => {
    if (isSuccess) {
      setProductCategories(categories.data);
    }
  }, [categories]);

  if (productsLoading) {
    return (
      <div className='w-full max-w-[100%] min-w-[50%] min-h-[100vh] flex items-center justify-center'>
        <Loading width={50} />
      </div>
    );
  }

  return (
    <div>
      <div className='category_section px-10 '>
        <Categories />
        <div>
          <div className='home_browse_category_container flex flex-wrap justify-around'>
            {products.map((item) => {
              return (
                <ProductCard
                  image={item.image[randomImage(item.image.length)]}
                  key={item.id}
                  description={item.description}
                  name={item.name}
                  category={getCatName(item.categoryId, productCategories)}
                  price={item.price}
                  quantity={item.quantity}
                  pId={item.id}
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
  const dispatch = useDispatch();

  const selectedCategory = useSelector((state) => {
    return state.categories.selectedCategory;
  });

  const [
    getProductsCategory,
    {
      data: categoryProducts,
      isLoading: productLoading,
      isSuccess: productsSuccess
    }
  ] = useLazyGetProductsCategoryQuery();

  useEffect(() => {
    if (isSuccess) {
      setCategories(categories.data);
    }
  }, [categories]);

  useEffect(() => {
    if (productsSuccess) {
      dispatch(setProductCategoriesLoading(false));
      dispatch(setCategoryProducts(categoryProducts.data.rows));
    }
  }, [productsSuccess, categoryProducts]);

  useEffect(() => {
    if (productLoading) {
      dispatch(setProductCategoriesLoading(true));
    }
    return () => {
      dispatch(setProductCategoriesLoading(false));
    };
  }, [productLoading]);

  if (isLoading) {
    return (
      <div className='w-full max-w-[100%] min-w-[50%] min-h-[100vh] flex items-center justify-center'>
        <Loading width={50} />
      </div>
    );
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (isSuccess) {
    return (
      <div className='flex flex-col p-8 w-full max-w-[20%] items-start gap-8'>
        <h1 className='category_title text-left text-[2.5rem] font-bold'>
          All Categories
        </h1>
        <ul className='flex flex-col gap-8 items-start'>
        {categories.data.map((category) => {
          const { id, name } = category;
          return (
            <li key={id} className='w-full'>
              <Button
                value={name}
                key={id}
                className={`py-2 px-6 border-none w-full shadow-md text-[1.5rem] rounded-md hover:scale-105 ${selectedCategory === id ? 'bg-primary text-white' : 'bg-transparent'}`}
                onClick={() => {
                  dispatch(updateSelectedCategory(id));
                  const size = 20;
                  const page = 1;
                  getProductsCategory({ categoryId: id, size, page });
                }}
              />
            </li>
          );
        })}
        </ul>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='h-[80vh] flex flex-col items-center justify-center'>
        <h1 className='text-[5rem] text-primary'>Could not fetch products</h1>
      </div>
    );
  }

  return null;
};

const showCart = () => {
  document.querySelector('.cart_overlay').style.display = 'flex';
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
          onClick={showCart}
        />

        <Button
          route='/wishlist'
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

const randomImage = (size) => {
  return Math.floor(Math.random() * size);
};

export { Categories }
