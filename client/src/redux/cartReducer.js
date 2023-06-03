import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: []
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload.products)
        },
        removeProduct: (state, action) => {
            const productIndex = state.products.findIndex((product) => product.id === action.payload.id);

            if (productIndex > -1) {
                state.products.splice(productIndex, 1);
            }

        }
    }
})

export const { addProduct, removeProduct } = cartSlice.actions
export default cartSlice.reducer