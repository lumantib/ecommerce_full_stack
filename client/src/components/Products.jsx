import { ShoppingCartOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../redux/cartReducer';
import products from "./product_data";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import publicRequest from '../requests/requestMethos';

const ProductListPage = () => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    console.log(cart.products)
    const handleAddToCart = (item) => {
        dispatch(addProduct({ products: item }))
    }
    const handleRemoveFromCart = (item) => {
        dispatch(removeProduct({ id: item.id }))
    }
    const [prouctsData, setProuctsData] = useState([]);
    useEffect(() => {
        publicRequest.get("products/isVerified")
            .then(res => setProuctsData(res?.data))
            .catch(err => console.log(err))
    }, []);
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Amazing Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {prouctsData.map((product) => {

                    return (
                        <div
                            key={product._id}
                            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
                        >
                            <div className="relative h-56">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                {product.offer ? (
                                    <div className="absolute top-0 right-0 p-2 bg-blue-500 rounded-bl-lg">
                                        <span className="text-white font-semibold line-through mr-1">
                                            ${product.price.toFixed(2)}
                                        </span>
                                        <span className="text-white font-semibold">
                                            ${(product.price - (product.price * parseFloat(product.offer) / 100)).toFixed(2)}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="absolute top-0 right-0 p-2 bg-blue-500 rounded-bl-lg">
                                        <span className="text-white font-semibold">
                                            ${product.price.toFixed(2)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2 flex justify-between items-center">
                                    <span>{product.name}</span>
                                    {
                                        cart?.products?.find(item => item._id === product._id) ?
                                            <button onClick={() => handleRemoveFromCart(product)} >
                                                <HighlightOffIcon className="w-5 h-5 text-blue-500" />
                                            </button>
                                            :
                                            <button onClick={() => handleAddToCart(product)} >
                                                <ShoppingCartOutlined className="w-5 h-5 text-blue-500" />
                                            </button>
                                    }
                                </h2>
                                <p className="text-sm text-gray-600">
                                    {product.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductListPage;
