import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import {
  useGetAllCategoriesQuery,
  usePostProductSearchMutation
} from '../states/api/apiSlice';
import Loading from '../components/Loading';

const SearchContainer = () => {
  const [products, setProducts] = useState([]);
  const searchData = useSelector((state) => {
    return state.search.searchData;
  });

  const { data: categories } = useGetAllCategoriesQuery();

  const [postProductSearch, { isLoading, isError }] =
    usePostProductSearchMutation();

  useEffect(() => {
    postProductSearch({
      name: searchData.name,
      categoryIds: searchData.categoryIds,
      price: searchData.price,
      size: searchData.size,
      page: searchData.page
    })
      .unwrap()
      .then(({ data }) => {
        setProducts(data);
      })
      .catch(() => {});
  }, [searchData, categories]);

  const getCatName = (id, arr) => {
    const category = arr.find((item) => {
      return item.id === id;
    });
    return category ? category.name : 'Category';
  };

  if (isLoading) {
    return (
      <div className='min-h-[80vh] flex items-center justify-center'>
        <Loading width={50} />
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

  return (
    <div className='search_results_container flex items-start my-12 w-11/12 mx-auto min-h-[80vh] screen-mid:mid-category '>
      <div className='search_products_container w-full flex flex-col items-center my-12'>
        <div className='search_products_header flex items-center justify-between'>
          {products.length > 0 && (
            <h1 className='text-[2rem] text-primary'>
              Showing {products.length} results for Product: {searchData.name}
            </h1>
          )}
        </div>
        <div className='product_card_container flex items-center flex-wrap gap-6'>
          {products.map((product) => {
            return (
              <ProductCard
                className='py-8 px-6'
                key={product.id}
                price={product.price}
                name={product.name}
                route={`products/${product.id}`}
                image={product.image[0]}
                category={getCatName(product.categoryId, categories.data)}
                pId={product.id}
                rating={5}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SearchContainer;
