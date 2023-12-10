import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import Products from './Products'
import Product from './Product'
import NavBar from './NavBar'
import About from './About'
import Logup from './Logup'

export default function Router() {

    return <><NavBar/>
            <Routes>
            <Route path='home' element={<h1>Home</h1>} />
            <Route path='login' element={<Login />} />
            <Route path='logup' element={<Logup/>} />
            <Route path='about' element={<About/>} />
            <Route path='product/:id' element={<Product />} />
            <Route path='products' element={<Products />} />
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='*' element={<h1>404 Page Not Found</h1>} />
        </Routes></>
}