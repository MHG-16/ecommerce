import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsBagCheckFill } from 'react-icons/bs';

import { runfireworks } from '../lib/utils';
import { useStateContext } from '../context/stateContext';

const Success = () => {

  const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantity(0); 
    runfireworks();
  }, [])
  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Thank you for your order !</h2>
            <p className='email-msg'>Check your email inbox for the receipt</p>
            <p className='description'>
              If you have  any questions, please contact this email address
              <a className='email' href="mailto:crm@amegakurenosato.jp">crm@amegakurenosato.jp</a>
              <Link href="/">
                <button type="submit"  className='btn'>
                  Continue to Shopping
                </button>
              </Link>
            </p>
        </div>
    </div>
  )
}

export default Success