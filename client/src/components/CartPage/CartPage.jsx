import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bluejeans from './bluejeans.jpg';
import { removeProduct, resetProduct } from '../../redux/cartReducer';
import { Link, useNavigate } from 'react-router-dom';
import publicRequest from '../../requests/requestMethos';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CartPage = () => {
    const navigate = useNavigate();
    const calculateTotal = () => {
        const total = cart.products.reduce((acc, item) => acc + item.price, 0);
        return total.toFixed(2);
    };

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const handleRemoveFromCart = (item) => {
        dispatch(removeProduct({ id: item.id }));
    };
    const product_ids = cart.products.map((product) => product._id).join();
    const [alreadyBought, setAlreadyBought] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Submit data
    const handleSubmit = async () => {
        setIsLoading(true);
        // Show Popup
        MySwal.fire({
            title: <p>Your order is being placed</p>,
            didOpen: () => {
                MySwal.showLoading();
            },
        });
        try {
            // Call Api
            const response = await publicRequest.post('orders', {
                products: cart.products.map((product) => product._id),
            });
            Swal.close();

            // Make cart product 0 after bought(using redux)
            dispatch(resetProduct());
            MySwal.fire(<p>Order has been placed</p>, <p className='font-bold'>Your item(s) will be delivered in 2-3 days.</p>).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            });
            console.log(response.data);
            setIsLoading(false);
        } catch (error) {
            Swal.close();
            setAlreadyBought(error.response.data.invalidProductIds);
            console.log(error.response.data.invalidProductIds);
            setIsLoading(false);
        }
    };

    return (
        <div className="!font-bold container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-4">Cart</h1>
            {cart.products.length === 0 && (
                <div className="bg-white p-4 shadow sm:rounded-lg text-center">
                    <p className="text-gray-500 hover:text">
                        Your cart is empty. <Link to="/" className='text-blue-600 font-bold'>View other products</Link>
                    </p>
                </div>
            )}
            {cart.products.length > 0 && (
                <div className="flex flex-col sm:flex-row">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg w-full">
                        <div className="flex flex-col divide-y divide-gray-200">
                            {cart.products.map((item) => (
                                <div
                                    key={item.id}
                                    className={` !font-bold flex items-center px-4 py-3 ${alreadyBought.includes(item._id) ? 'bg-gray-200' : ''
                                        }`}
                                >
                                    <div className="w-16 h-16 flex-shrink-0">
                                        <img
                                            src={`http://localhost:5000/photo${item.photo}`}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <h3 className="text-lg  text-gray-900">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-500">Rs. {item.price}</p>
                                        {item.buyer && (
                                            <p className="text-red-500">Already bought</p>
                                        )}
                                    </div>
                                    {!item.buyer && (
                                        <div>
                                            <button
                                                className="text-red-500 hover:text-red-600 ml-2"
                                                onClick={() => handleRemoveFromCart(item)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-100 px-4 py-3 flex justify-between items-center">
                            <p className="text-gray-600 ">
                                Total: Rs {calculateTotal()}
                            </p>
                            <p className="text-gray-900 font-semibold">
                                <button
                                    className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Placing Order...' : 'Place Order'}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
