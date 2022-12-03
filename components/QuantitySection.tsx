import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useStateContext } from '../context/stateContext'

const QuantitySection = () => {
  const {decQty, qty, incQty} = useStateContext();
  return (
    <p className='quantity-desc'>
                            <span className='minus' onClick={() => decQty()}><AiOutlineMinus/></span>
                            <span className='num'>{qty}</span>
                            <span className='plus' onClick={() => incQty()}><AiOutlinePlus/></span>
    </p>
  )
}

export default QuantitySection