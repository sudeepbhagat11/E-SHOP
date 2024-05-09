import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// const initialState = localStorage.getItem('cart')
// ? JSON.parse(localStorage.getItem('cart')) : {cartItems : []};

const getInitialCartState = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : { cartItems: [], shippingAddress:{},
    paymentMethod : 'PayPal' };
  };

  const initialState = getInitialCartState();


const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addToCart : (state,action) => {
            const item = action.payload;

            const coexist = state.cartItems.find((x) => 
                x._id === item._id

            );
            if(coexist){
                state.cartItems = state.cartItems.map((x) => 
                    x._id === coexist._id ? item:x
                )
            }
            else{
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state);

            
        },

        removeFromCart : (state,action) => {
            const item = action.payload;
            state.cartItems = state.cartItems.filter((x) => x._id !== item);

            return updateCart(state);
        },

        saveShippingAddress : (state,action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },

        savePaymentMethod : (state,action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },

        clearCartItems : (state, action) => {
            state.cartItems = [];
            return updateCart(state);
        }

        

    }
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod,clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
