import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    products: []
}

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

        },
        resetProduct: () => initialState
    }
})

export const { addProduct, removeProduct, resetProduct } = cartSlice.actions
export default cartSlice.reducer