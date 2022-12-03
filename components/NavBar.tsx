import Link from 'next/link';
import React from 'react';

import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../context/stateContext';
import Cart from './Cart';

const NavBar = () => {
  const { showCart, setShowCart, totalQuantity } = useStateContext();

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">Amegakure No Sato Store</Link>
      </p>

      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'> {totalQuantity}</span>
      </button>
      {showCart && <Cart />}
    </div>
  )
}

export default NavBar