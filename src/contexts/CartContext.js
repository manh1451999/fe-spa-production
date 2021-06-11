import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CartContext = React.createContext();
export default CartContext
export const CartConsumer = CartContext.Consumer;

export function CartProvider(props) {

    const [cartItems, setCartItems] = useState([]);
    const [cartAmount, setCartAmount] = useState(null);

    useEffect(() => {
        if (localStorage.firstName && localStorage.firstName != 'undefined')
            uploadCart()

    }, [])

    function uploadCart() {
        axios.get("/cart")
            .then(res => {
                setCartItems(res.data.list)
            })
    }


    useEffect(() => {
        let amount = 0;
        cartItems.map((e) => {
            amount += e.amount
        })
        setCartAmount(amount)
    }, [cartItems])

    return (
        <CartContext.Provider value={{
            cartItems,
            cartAmount,
            uploadCart
        }}>
            {props.children}
        </CartContext.Provider>
    );
}

