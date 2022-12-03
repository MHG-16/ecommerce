import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useStateContext } from '../context/stateContext'

const QuantitySection = ({product}:any) => {
  const {decQty, qty, incQty, toggleCartItemQuantity} = useStateContext();
  return (
    <p className='quantity-desc'>
                            <span className='minus' onClick={() => {decQty();product&&toggleCartItemQuantity(product._id,'dec')}}><AiOutlineMinus/></span>
                            <span className='num'>{product?product.quantity:qty}</span>
                            <span className='plus' onClick={() => {incQty();product&&toggleCartItemQuantity(product._id,'inc')}}><AiOutlinePlus/></span>
    </p>
  )
}

export default QuantitySection