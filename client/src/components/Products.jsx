import { ShoppingCartOutlined } from '@mui/icons-material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../redux/cartReducer';
import publicRequest from '../requests/requestMethos';
import bluejeans from "./bluejeans.jpg"
import { useSearchParams } from 'react-router-dom';
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
        publicRequest.get(`products/isVerified?category=${searchParams.get('category')}`)
            .then(res => setProuctsData(res?.data))
            .catch(err => console.log(err))
    }, []);


    let [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get('category')); // send


    // const history = useHistory()
    // history.location.pathname

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

                                <div className="w-full h-full filter overflow-hidden hover bg-no-repeat object-fit bg-cover" style={{ backgroundImage: `url(http://localhost:5000/photo${product.photo})` }}>
                                    {/* <img
                                        src={bluejeans}
                                        alt={product.name}
                                        className="w-full h-full object-cover filter hover:blur-s"
                                    /> */}
                                </div>
                                {product.offer ? (
                                    <div className="absolute top-0 right-0 p-2 bg-blue-500 rounded-bl-lg">
                                        <span className="text-white font-semibold line-through mr-1">
                                            Rs {product.price.toFixed(2)}
                                        </span>
                                        <span className="text-white font-semibold">
                                            Rs {(product.price - (product.price * parseFloat(product.offer) / 100)).toFixed(2)}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="absolute top-0 right-0 p-2 bg-blue-500 rounded-bl-lg">
                                        <span className="text-white font-semibold">
                                            Rs {product.price.toFixed(2)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-2 flex justify-between items-center">
                                    <span>{product.name}</span>
                                </h2>
                                <p className="text-sm text-gray-600 mb-2">
                                    {product.description}
                                </p>
                                {
                                    cart?.products?.find(item => item._id === product._id) ?
                                        <button onClick={() => handleRemoveFromCart(product)} className='hover:bg-blue-600 text-white rounded-sm w-full p-2 bg-blue-500'>
                                            <HighlightOffIcon className="w-5 h-5" /> Added to cart
                                        </button>
                                        :
                                        <button onClick={() => handleAddToCart(product)} className='hover:bg-blue-600 text-white rounded-sm w-full p-2 bg-blue-500'>
                                            <ShoppingCartOutlined className="w-5 h-5 " /> Add to cart
                                        </button>
                                }
                            </div>
                        </div>
                    );
                })}
            </div>
        </div >
    );
};

export default ProductListPage;
