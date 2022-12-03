import Link from 'next/link';
import React from 'react';

import { AiOutlineShopping } from 'react-icons/ai';

const NavBar = () => {
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">Amegakure No Sato Store</Link>
      </p>

      <button type='button' className='cart-icon' onClick={() => console.log("Clicked")}>
        <AiOutlineShopping />
        <span className='cart-item-qty'> 1</span>
      </button>
    </div>
  )
}

export default NavBar