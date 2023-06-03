import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bluejeans from './bluejeans.jpg';
import { removeProduct } from '../../redux/cartReducer';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const calculateTotal = () => {
        const total = cart.products.reduce((acc, item) => acc + item.price, 0);
        return total.toFixed(2);
    };

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const handleRemoveFromCart = (item) => {
        dispatch(removeProduct({ id: item.id }))
    }
    console.log("cart.products", cart.products)
    const PaymentMethod = () => {
        return (
            <div className="bg-white p-4 shadow sm:rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
                <p className="text-gray-500">Choose your preferred payment method:</p>
                <div className="flex items-center mt-4">
                    <input type="radio" id="creditCard" name="paymentMethod" className="mr-2" />
                    <label htmlFor="creditCard" className="text-gray-700">Credit Card</label>
                </div>
                <div className="flex items-center mt-2">
                    <input type="radio" id="paypal" name="paymentMethod" className="mr-2" />
                    <label htmlFor="paypal" className="text-gray-700">PayPal</label>
                </div>
                <div className="flex items-center mt-2">
                    <input type="radio" id="cash" name="paymentMethod" className="mr-2" />
                    <label htmlFor="cash" className="text-gray-700">Cash on Delivery</label>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-4 rounded">
                    Place Order
                </button>
            </div>
        );
    };

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-4">Cart</h1>

            {cart.products.length === 0 ? (
                <div className="bg-white p-4 shadow sm:rounded-lg">
                    <p className="text-gray-500">Your cart is empty.<Link to="">Home</Link></p>
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full sm:w-3/4">
                        <div className="flex flex-col divide-y divide-gray-200">
                            {cart.products.map((item) => (
                                <div key={item.id} className="flex items-center px-4 py-3">
                                    <div className="w-16 h-16 flex-shrink-0">
                                        <img src={bluejeans} alt={item.product_name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">{item.product_name}</h3>
                                        <p className="text-gray-500">${item.price}</p>
                                    </div>
                                    <div>
                                        <button
                                            className="text-red-500 hover:text-red-600 ml-2"
                                            onClick={() => handleRemoveFromCart(item)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-100 px-4 py-3 flex justify-between">
                            <p className="text-gray-600 font-medium">Total:</p>
                            <p className="text-gray-900 font-semibold">Rs {calculateTotal()}</p>
                        </div>
                    </div>
                    <div className="sm:ml-4 mt-4 sm:mt-0 sm:w-1/4">
                        <PaymentMethod />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
