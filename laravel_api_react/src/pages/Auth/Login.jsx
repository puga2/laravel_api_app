import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';

const Login = () => {

  const {token,setToken} = useContext(AppContext);
  const navigate = useNavigate();
  

  const [formData,setFormData] = useState({
    email:'',
    password:'',
  });

  const [errors ,setErrors]= useState({});

 async function handleLogin(e){
    e.preventDefault();
    
    const res = await fetch("/api/login",{
      method:'Post',
      body:JSON.stringify(formData),
    });

    const data = await res.json();
    console.log(data);

    if(data.errors){
      setErrors(data.errors)
    }else{
      localStorage.setItem('token',data.token); 
      // use react context  for  auth user
      setToken(data.token);
      // navigate("/");

    }

  }
  return (
    <>
        <h1 className='title'>Login a new account</h1>
        {/* {token} */}
        <form onSubmit={handleLogin} className='w-1/2 mx-auto space-y-6'>
       
           <div>
            <input type="text" placeholder="Email" value={formData.email} 
            onChange={(e)=>setFormData({...formData,email:e.target.value})}/>
            {errors.email && <p className='error'>{errors.email[0]}</p>}
           </div>
           <div>
            <input type="password" placeholder="Password"  value={formData.password}
            onChange={(e)=>setFormData({...formData,password:e.target.value})}
            />
            {errors.password && <p className='error'>{errors.password[0]}</p>}
           </div>
           <button className='primary-btn'>Login</button>
        </form>
    </>
  )
}

export default Login