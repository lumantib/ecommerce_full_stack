import { Container } from '@mui/system'
import { Link } from 'react-router-dom'

const categories = () => {
    return (
        <div className='flex' id="category">
            <div className='h-full w-[550px] flex flex-col justify-center items-center'>
                <img src="./images/women.jpg" className='h-[450px] w-[350px]' />
                <p className='font-bold'>Women's Wear</p>
                <Link to="/product?category=Womens" className='font-bold w-[150px] text-center p-2 border-current bg-slate-300 m-2'>Click to Shop</Link>
            </div>
            <div className='h-full w-[500px] flex flex-col justify-center items-center'>
                <img src="./images/kidsitting.jpg" className='h-[450px] w-full' />
                <p className='font-bold'>Kid's Wear</p>
                <Link to="/product?category=Kids" className='font-bold text-center w-[150px]  p-2 bg-slate-300 m-2'>Click to Shop</Link>
            </div>
            <div className='h-full w-[484px] flex flex-col justify-center items-center'>
                <img src="./images/mensitting.jpg" className='h-[450px] w-[300px]' />
                <p className='font-bold'>Men's Wear</p>
                <Link to="/product?category=Mens" className='font-bold w-[150px] text-center p-2 border-current bg-slate-300 m-2'>Click to Shop</Link>
            </div>
        </div>
    )
}

export default categories
