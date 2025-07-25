import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Layout = () => {


    const {token,user,setUser,setToken} = useContext(AppContext);
    const navigate = useNavigate();


    async function handleLogout(e){
        e.preventDefault();

        const res = await fetch('/api/logout',{
            method:'POST',
            headers:{
                Authorization: `Bearer ${token}`
            },
        })

        const data = await res.json();
        console.log(data);

        if(res.ok){
           setUser(null);
           setToken(null);
           localStorage.removeItem('token');
           navigate('/');
        }
    }
  return (
    <>
        <header>
            <nav>
                <Link to="/" className='nav-link'>Home</Link>
        {user ? (
            <div className='flex items-center space-x-4'>
                <p  className='text-slate-400 text-xs'>Welcome back {user.name}</p>
                <form onSubmit={handleLogout}>
                    <button className='nav-link'>Logout</button>
                </form>
            </div>
        ): (

            <div className='space-x-4'>
                <Link to="/register" className='nav-link'>Register</Link>
                <Link to="/login" className='nav-link'>Login</Link>

            </div>
        )}
            
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
    </>
  )
}

export default Layout