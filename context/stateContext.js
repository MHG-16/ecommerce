import React ,{createContext, useContext, useState} from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [qty, setQty] = useState(1);

    const incQty = () => setQty((prevQty) => prevQty + 1);
    const decQty = () => setQty((prevQty) => (prevQty - 1) < 1 ? 1 : prevQty-1);

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find(item => item._id === product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
        setTotalQuantity((prevTotalQuantites) => prevTotalQuantites + quantity)
        if(checkProductInCart){
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    return {
                        ...cartProduct, 
                        quantity: cartProduct.quantity + quantity
                    }
                }
            })
            setCartItems(updatedCartItems);
        }
        else {
            product.quantity = quantity
            setCartItems([...cartItems, {...product} ]);
        }
        toast.success(`${quantity} ${product.name} added to the cart.`)
    }   
    return (
        <Context.Provider 
            value={{
                showCart, 
                cartItems,
                totalPrice,
                totalQuantity,
                qty,
                incQty,
                decQty,
                onAdd,
                totalQuantity,
                showCart,
                setShowCart,
            }}
            >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);