import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css'
import Layout from './pages/Layout';
import Home from './pages/Home.Jsx';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import { AppContext } from './Context/AppContext';
import { useContext } from 'react';

 export default function App() {
  const {user} = useContext(AppContext);
  return (

  
    <BrowserRouter>
     <Routes>
        <Route path='/' element={<Layout/>}> // parent route
          <Route index element={<Home/>}    />

          <Route path='/register' element={user ? <Home/> : <Register/>} />
          <Route path='/login' element={user ? <Home/> : <Login/>} />
          
        </Route>
     </Routes>
    </BrowserRouter>
  )
}


