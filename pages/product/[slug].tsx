import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import { Product } from '../../components'
import QuantitySection from '../../components/QuantitySection'
import { useStateContext } from '../../context/stateContext'
import { client, urlFor } from '../../lib/client'


const ProductDetails = ({product, products}: any) => {

  const {image, name, details, price} = product;
  const [index, setIndex] =  useState(0);
  const {qty, onAdd, setShowCart} = useStateContext();
  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true)
  }
  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img
                        className='product-detail-image' 
                        src={urlFor(image && image[index]).toString()} />
                </div>
                <div 
                className='small-images-container'>
                    {image?.map((item: any, count: number) => 
                    <img src={urlFor(item).toString()} 
                        key={count}
                        className={count === index ? 'small-image selected-image' : 'small-image'}
                        onClick={() => setIndex(count)}/>)}
                </div>
            </div>
            <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className='reviews'>
                        <div>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className='price'>€{price}</p>
                    <div className='quantity'>
                        <h3>Quantity:</h3>
                        <QuantitySection/>
                    </div>
                    <div className='buttons'>
                        <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>Add to Cart</button>
                        <button type='button' className='buy-now' onClick={handleBuyNow}>Buy Now</button>
                    </div>
            </div>
        </div>
        <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                    {products.map((item: any) => (
                        <Product product={item} key={item._id}/>
                    ))}
                </div>
            </div>
        </div>
    </div>
)}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;

    const products = await client.fetch(query);

    const paths = products.map((product: {slug:{current: string}}) => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
} 

export const getStaticProps: GetStaticProps<PageProps, ContextParams> = async (context) => {
    const query = `*[_type == "product" && 
        slug.current == '${context.params?.slug.toString()}'][0]`;
    const product = await client.fetch(query);

    const queryManyProducts = '*[_type == "product"]';
    const products = await client.fetch(queryManyProducts);

    return {
        props:{
            product,
            products,
        }
    }
}

type ContextParams = {
    slug: string
}

type PageProps ={
    product: any,
    products: any
}
export default ProductDetails