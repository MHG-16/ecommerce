import { NextApiRequest, NextApiResponse } from "next";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const cartItems = req.body.cartItems;
    try {
      const params = {
        line_items: cartItems.map((item:{image: any, name:string, price: number, quantity: number}) => {
          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/9k9r8j56/production/')
          .replace('-png', '.png')
          console.log(newImage);
          return {
            price_data:{
              currency: 'eur',
              product_data: {
                name: item.name,
                images: [newImage]
              },
              unit_amount: item.price * 100
            },
            quantity: item.quantity
            }
        }),
        submit_type: 'pay',
        payment_method_types: ["card"],
        billing_address_collection: 'auto',
        shipping_options: [
            { shipping_rate: 'shr_1MBEgYLJEg909AhHJQ5tPqwm' },
            { shipping_rate: 'shr_1MBEiALJEg909AhHwGdU29Jk' }
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session)
    } catch (err:any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}