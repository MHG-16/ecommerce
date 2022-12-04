import React, { useRef } from 'react'
import { toast } from 'react-hot-toast';
import { AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import {TiDeleteOutline} from 'react-icons/ti';
import { json } from 'stream/consumers';

import { useStateContext } from '../context/stateContext';
import { urlFor } from '../lib/client';
import  getStripe  from '../lib/getStripe';
import QuantitySection from './QuantitySection';

export default function Cart() {
  const cartRef = useRef<HTMLDivElement|null>(null);
  const { totalPrice, totalQuantity, cartItems, setShowCart, onRemove } = useStateContext();
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cartItems: cartItems})
    });
    if (response.status === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({sessionId: data.id})
  }


  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button type='button' className='cart-heading'
        onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>
            Your Cart
          </span>
          <span className='cart-num-items'>
            ({totalQuantity} items)
          </span>
        </button>
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150}/>
            <h3>Your shopping bag is empty</h3>
            <button type='button' 
            className='btn'
            onClick={() => setShowCart(false)}
            >
              Continue Shopping
            </button>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item:{image: any, name:string, price: number, _id: string, quantity: number}, index: number) => (
            <div className='product' key={`product-${index}-${item._id}`}>
              <img src={urlFor(item?.image[0]).toString()} 
                className='cart-product-image'
              /> 
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>{item.price} €</h4>
                </div>
                <div className='flex bottom'>
                  <QuantitySection product={item}/>
                  <button 
                    type='button' className='remove-item'
                    onClick={() => onRemove(item._id)}>
                      <TiDeleteOutline/>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>€{totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick={() => handleCheckout()}>Pay with Stripe</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
