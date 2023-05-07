import { AddShoppingCartOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
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
const Language = styled.span`
    font-size:20px;
    cursor: pointer;
    text-align:center
`
const SearchContainer = styled.div`
    border:1px soild black;
    display:flex;
    text-align:center;
    margin-left:10px;//nabeh box tasera aucha EN sita
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
const Menuitem = styled.div`
    font-size:20px;
    cursor: pointer;
    margin-left:20px;
`
const Navbar = () => {
    return (
        <Container className='drop-shadow-lg z-[10] shadow-sm'>
            <Wrapper>
                <Left>
                    <Logo>Affordable Thrift Store</Logo>
                </Left>
                <Center>

                </Center>
                <Right>
                    <div className='flex gap-4'>
                        {
                            localStorage.getItem("username") ?
                                <div>
                                    Welcome ||
                                    <Link to=" seller">Sell item</Link>
                                </div>
                                :
                                <>
                                    <Link to="register">Signup</Link><button
                                        data-te-target="#lumanti" data-te-toggle="modal"
                                    >  Login</button>
                                </>
                        }



                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </div>
                </Right>
            </Wrapper>
        </Container>

    )
}

export default Navbar
