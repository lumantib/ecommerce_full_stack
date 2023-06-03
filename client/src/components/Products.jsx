import { AddShoppingCart, ShoppingCart, ShoppingCartOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import Footer from './Footer';
import product_card from "./product_data";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../redux/cartReducer';

const Products = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const handleAddToCart = (item) => {
        dispatch(addProduct({ products: item }))
    }
    const handleRemoveFromCart = (item) => {
        dispatch(removeProduct({ id: item.id }))
    }
    console.log("cart.products", cart.products)
    const listItems = product_card.map((item) =>

        <div className="card py-5 ml-12 mr-10" key={item.id} >
            <div className='card_img'>
                <img src={item.thumb} className="h-[250px] w-[300px] " />
            </div>
            <div className='card_header text-center'>
                <h2 className='text-[20px] font-serif'>{item.product_name}</h2>
                <p className=' font-normal font-mono text-[15px]'>{item.description}</p>
                <p className='price font-mono text-[18px]'>{item.price}
                    <span className='font-mono text-[18px]'> {item.currency}</span>
                </p>
                {
                    cart?.products?.find(cart_item => cart_item.id == item.id)
                        ?
                        <Button
                            className='btn font-mono text-[20px] border-spacing-2 bg-gradient-to-r from-green-400 hover:from-pink-500 hover:to-yellow-500 rounded'
                            onClick={() => handleRemoveFromCart(item)}

                        >
                            <span>Remove from cart</span>
                            <ShoppingCart />
                        </Button>
                        :
                        <Button
                            className='btn font-mono text-[20px] border-spacing-2 bg-gradient-to-r from-green-400 hover:from-pink-500 hover:to-yellow-500 rounded'
                            onClick={() => handleAddToCart(item)}

                        >
                            <span>Add to cart</span>
                            <ShoppingCart />
                        </Button>

                }
            </div>
        </div>

    );

    console.log(cart.products)
    return (
        <div className="Product">
            <div className='p-3 bg-slate-100   text-[22px]  grid grid-cols-3'>
                <div>
                    <h3 className='font-bold  text-left '>Affordable Thrift Store</h3>
                </div>
                <div>
                    <h3 className='font-bold  text-[25px] tracking-widest text-center'>Products</h3>
                </div>
                <div>
                    <Link to="/product/checkout" className='font-bold   float-right'>Checkout  <ShoppingCartOutlined />{cart.products === undefined ? "0" : `${cart.products.length}`}</Link>
                </div>
            </div>
            <div className='font-bold w-100% grid grid-cols-4 gap-10 items-justify'> {listItems}</div>
            <Footer />
        </div>
    )

}

export default Products;
