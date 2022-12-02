import type { GetServerSideProps, NextPage } from 'next';

import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner} 
from '../components';


const Home: NextPage = ({products, bannerData}: any) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length &&
        bannerData[0]}/>
      {console.log(bannerData)}
      <div className='products-heading'>
        <h2>Best selling products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((product:{name: string}) => product.name)}
      </div>

      <FooterBanner/>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery); 
  return{
    props: {
      products,
      bannerData
    }
  }
}

export default Home
