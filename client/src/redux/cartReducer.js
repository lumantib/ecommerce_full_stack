import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    products: []
}

const cartSlice = createSlice({
    name: 'cart',
    // this is global variable
    initialState: {
        products: []
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload.products)
        },
        removeProduct: (state, action) => {
            // first find index of product from cart
            const productIndex = state.products.findIndex((product) => product.id === action.payload.id);

            // if product is -1 it means there are no product in cart, 
            if (productIndex > -1) {
                // remove product
                state.products.splice(productIndex, 1);
            }

        },
        resetProduct: () => initialState
    }
})

export const { addProduct, removeProduct, resetProduct } = cartSlice.actions
export default cartSlice.reducer