"use client"
import Container from '@/components/header/Container';
import ProductData from '@/components/products/ProductData';
import SingleProduct from '@/components/products/SingleProduct';
import { useGetProductsQuery, useGetSingleProductQuery } from '@/features/productSlice/product.slice';
import React from 'react'
import Loading from '@/app/loading';


const ProductPage = ({params}) => {
  // in case of finding product by search parameters
// const ProductPage = ({searchParams}) => {
  // console.log("search param is ", searchParams);
  // const {data, isLoading, error} = useGetProductQuery(searchParams);

  const _id = params.productId;
  const {data: product, isLoading: productIsLoading, error: productError} = useGetSingleProductQuery(_id); 
  const {data: products, isLoading, error} = useGetProductsQuery();
  var singleProduct = product?.data //should do like this because data from rtk hook takes time to fetch and this product variable only gets assigned using conditional operator after hook fetches data
  var trendingProducts = products?.data.slice(0,4)
  if(productIsLoading) {
    return <Loading />
  }


  return (
      <Container>
        <div>
          <SingleProduct singleProduct={singleProduct} />
          <p className="text-3xl font-semibold text-orange-600 py-10 select-none hover:text-orange-500">Trending Products</p>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
            {trendingProducts?.map(product => (
              <ProductData key={product._id} product={product} />
            ))}
          </div>
        </div>
      </Container>
  )
}

export default ProductPage