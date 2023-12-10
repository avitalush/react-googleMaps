
import { NavLink } from 'react-router-dom'
import './style.css'

export default function NavBar() {

    return <nav className='nav-bar'>
        <NavLink to='/home'>Home</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/logup'>logup</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/products'>Products</NavLink>
    </ nav>

}