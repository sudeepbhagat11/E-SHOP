export const addDecimals = (num) => {
    return (Math.round(num*100)/100).toFixed(2);
}

export const updateCart = (state) => {
    // Calculate items price

    state.itemsPrice =addDecimals(state.cartItems.reduce((acc,item) => 
    acc + item.price * item.qty,0));

// Shipping price if amt is greater than 100 then free else 30 rs
state.shippingPrice = addDecimals(state.itemsPrice > 1000 ? 0 : 30);

// GST 18%
state.taxPrice = addDecimals(Number((0.18 * state.itemsPrice).toFixed(2)));

state.totalPrice = (
    Number(state.itemsPrice) + 
    Number(state.shippingPrice) +
    Number(state.taxPrice)
).toFixed(2);

localStorage.setItem('cart', JSON.stringify(state));

return state;
}