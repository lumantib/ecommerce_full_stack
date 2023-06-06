import { ShoppingCartOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import NavbarAvatar from './NavbarAvatar'

const Container = styled.div`
    height:50px;
    background-color:white;
`
const Wrapper = styled.span`
    padding:10px 20px;
    // padding chai top-bottom and left right
    display:flex; //horizontal garna
    justify-content:space-between;///lefcenterright yesri join bhayera aucha
    font-weight:bold;//bold garna
`
const Left = styled.div`
    flex:1;
    
`
const Center = styled.div`
    flex:1;
    display:flex;
    justify-content:center;
`
const Logo = styled.h1`
    font-weight:bold;
    font-size:20px;
`
const Right = styled.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:flex-end;
`
const Navbar = () => {
    const cart = useSelector(state => state.cart)
    console.log("cart", cart.products.length)
    return (
        <Container className='drop-shadow-lg z-[10] shadow-sm'>
            <Wrapper>
                <Left>
                    <Link to="">
                        <Logo>Affordable Thrift Store</Logo>
                    </Link>
                </Left>
                <Center>

                </Center>
                <Right>
                    <div className='flex gap-4 items-center'>

                        <Link to="product/checkout">
                            <Badge badgeContent={cart.products.length} color="primary" className='cursor-pointer'>
                                <ShoppingCartOutlined />
                            </Badge>
                        </Link>
                        {
                            localStorage.getItem("username") ?
                                <NavbarAvatar />
                                :
                                <>
                                    <Link to="register">Signup</Link><button
                                        data-te-target="#lumanti" data-te-toggle="modal"
                                    >  Login</button>
                                </>
                        }
                    </div>
                </Right>
            </Wrapper>
        </Container>

    )
}

export default Navbar
