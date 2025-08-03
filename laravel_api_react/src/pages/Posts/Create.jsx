import React, { useContext, useState } from 'react'
import { AppContext } from '../../Context/AppContext';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const  {token} = useContext(AppContext);
  const [formData ,setFormData] = useState({
    title :"",
    body :"",
  });

  const [errors,setErrors]= useState({});
  const navigate = useNavigate();

  async function handleCreate(e){
    e.preventDefault();
    const res = await fetch('/api/posts',{
      method:"POST",
      headers:{
        'content-type':'application/json',
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify(formData)
    })
    const data = await res.json();

    if(data.errors){
      setErrors(data.errors)
    }else{
      navigate('/');
    }
    // console.log(data);
  }
  return (
    <>
     <h1 className='title'>Create a new post</h1>

     <form onSubmit={handleCreate} className='w-1/2 mx-auto space-y-6'>
        <div>
            <input type="text" placeholder='Post Title' value={formData.title} 
            onChange={(e)=>setFormData({...formData,title:e.target.value})}  />
            {errors.title && <p className='error'>{errors.title[0]}</p>}
        </div>
          <div>
        <textarea name="content" placeholder='Post Content' id="" value={formData.body}
        onChange={(e)=>setFormData({...formData,body:e.target.value})}></textarea>
        {errors.body &&  <p className='error'>{errors.body[0]}</p>}
        </div>
        <button className='primary-btn'>Create</button>
     </form>
    </>
  )
}

export default Create