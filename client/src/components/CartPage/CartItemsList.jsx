import React from 'react'
import CartItem from './CartItem'
import { useSelector } from 'react-redux'

const CartItemsList = () => {

    const cartItems = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 15 },
        { id: 3, name: 'Product 3', price: 20 },
    ];

    const cart = useSelector(state => state.cart)
    console.log(cart.products)
    return (
        // <div className='bg-white'>
        //     {
        //         cart.products.map((item) => {
        //             return <p>{JSON.stringify(item)}</p>
        //         })
        //     }
        //     <CartItem />
        //     <CartItem />
        //     <CartItem />
        //     <CartItem />
        // </div>
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-4">Cart</h1>

            {cart.products.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <ul className="divide-y divide-gray-200">
                        {cart.products.map((item) => (
                            <li key={item.id} className="px-4 py-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img
                                            src={item.thumb}
                                            alt={item.product_name}
                                            className="w-16 h-16 object-contain mr-4"
                                        />
                                        <div>
                                            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-gray-500">${item.price}</p>
                                        </div>
                                    </div>
                                    <button className="px-2 py-1 text-sm font-semibold text-red-500 hover:text-red-600">
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="bg-gray-100 px-4 py-3 flex justify-between">
                        <p className="text-gray-600 font-medium">Total:</p>
                        <p className="text-gray-900 font-semibold">$45</p>
                    </div>
                    <div className="px-4 py-3">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                            Checkout
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-lg text-gray-500">Your cart is empty.</p>
            )}
        </div>
    )
}

export default CartItemsList