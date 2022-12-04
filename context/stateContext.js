import React ,{createContext, useContext, useState} from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

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
            console.log(updatedCartItems)
            setCartItems(updatedCartItems);
        }
        else {
            product.quantity = quantity
            setCartItems([...cartItems, {...product} ]);
        }
        toast.success(`${quantity} ${product.name} added to the cart.`)
    }

    const onRemove = (id) => {
        const itemFound = cartItems.find((item) => item._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id);
        setTotalQuantity((prevTotalQuantites => prevTotalQuantites - itemFound.quantity))
        setTotalPrice((prevTotalPrice => prevTotalPrice - itemFound.price * itemFound.quantity))
        setCartItems(newCartItems);
        toast.success(`${itemFound.quantity} ${itemFound.name} removed `)
    }

    const toggleCartItemQuantity = (id, value) => {
        const newCartItems = cartItems.map((item) => {
            if(item._id === id)
            {
                if(value === 'inc'){
                    setTotalPrice((prevTotalPrice) => prevTotalPrice + item.price);
                    setTotalQuantity(prevTotalQuantites => prevTotalQuantites + 1);
                    return {...item, quantity: item.quantity +1}
                }
                else{
                    setTotalPrice((prevTotalPrice) => prevTotalPrice - item.price);
                    setTotalQuantity(prevTotalQuantites => prevTotalQuantites - 1);
                    return {...item, quantity: item.quantity - 1}
                }
            }
        })
        setCartItems(newCartItems);
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
                setTotalQuantity,
                setCartItems,
                setTotalPrice,
                totalQuantity,
                showCart,
                setShowCart,
                toggleCartItemQuantity,
                onRemove
            }}
            >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);