import React from 'react'
import { AiFillInstagram, AiOutlineFacebook, AiOutlineTwitter } from 'react-icons/ai'

export default function Footer() {
  return (
    <div className='footer-container'>
      <p>2022 Amegakure No Sato All right cpyrights reserved</p>
      <p className='icons'>
        <AiOutlineTwitter/>
        <AiFillInstagram/>
        <AiOutlineFacebook/>
      </p>
    </div>
  )
}
