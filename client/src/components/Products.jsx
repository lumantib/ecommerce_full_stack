// import { AddShoppingCart, ShoppingCart, ShoppingCartOutlined } from '@mui/icons-material';
// import { Button } from '@mui/material';
// import React from 'react';
// import Footer from './Footer';
import products from "./product_data";
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { addProduct, removeProduct } from '../redux/cartReducer';

// const Products = () => {
//     const dispatch = useDispatch()
//     const cart = useSelector(state => state.cart)
//     const handleAddToCart = (item) => {
//         dispatch(addProduct({ products: item }))
//     }
//     const handleRemoveFromCart = (item) => {
//         dispatch(removeProduct({ id: item.id }))
//     }
//     console.log("cart.products", cart.products)
//     const listItems = product_card.map((item) =>

//         <div className="card py-5 ml-12 mr-10" key={item.id} >
//             <div className='card_img'>
//                 <img src={item.thumb} className="h-[250px] w-[300px] " />
//             </div>
//             <div className='card_header text-center'>
//                 <h2 className='text-[20px] font-serif'>{item.product_name}</h2>
//                 <p className=' font-normal font-mono text-[15px]'>{item.description}</p>
//                 <p className='price font-mono text-[18px]'>{item.price}
//                     <span className='font-mono text-[18px]'> {item.currency}</span>
//                 </p>
//                 {
//                     cart?.products?.find(cart_item => cart_item.id == item.id)
//                         ?
//                         <Button
//                             className='btn font-mono text-[20px] border-spacing-2 bg-gradient-to-r from-green-400 hover:from-pink-500 hover:to-yellow-500 rounded'
//                             onClick={() => handleRemoveFromCart(item)}

//                         >
//                             <span>Remove from cart</span>
//                             <ShoppingCart />
//                         </Button>
//                         :
//                         <Button
//                             className='btn font-mono text-[20px] border-spacing-2 bg-gradient-to-r from-green-400 hover:from-pink-500 hover:to-yellow-500 rounded'
//                             onClick={() => handleAddToCart(item)}

//                         >
//                             <span>Add to cart</span>
//                             <ShoppingCart />
//                         </Button>

//                 }
//             </div>
//         </div>

//     );

//     console.log(cart.products)
//     return (
//         <div className="Product">
//             <div className='font-bold w-100% grid grid-cols-4 gap-10 items-justify'> {listItems}</div>
//         </div>
//     )

// }

// export default Products;
import React from 'react'; import { ShoppingCartOutlined } from '@mui/icons-material'

const ProductListPage = () => {
    // const products = [
    //     {
    //         id: 1,
    //         name: 'Product 1',
    //         price: 19.99,
    //         image: 'product1.jpg',
    //     },
    //     {
    //         id: 2,
    //         name: 'Product 2',
    //         price: 24.99,
    //         image: 'product2.jpg',
    //     },
    //     {
    //         id: 3,
    //         name: 'Product 3',
    //         price: 29.99,
    //         image: 'product3.jpg',
    //     },
    //     // Add more products as needed
    // ];

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Amazing Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => {

                    return (
                        <div
                            key={product.id}
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
                                    <ShoppingCartOutlined className="w-5 h-5 text-blue-500" />
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
