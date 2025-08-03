import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const {id} = useParams();
  const  {token,user} = useContext(AppContext);
  const [formData ,setFormData] = useState({
    title :"",
    body :"",
  });

  const [errors,setErrors]= useState({});
  const navigate = useNavigate();

     async function getPost(){
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();

      if(res.ok){ 
        if(data.data.user_id  !== user.id){
          navigate('/');
        }

        setFormData({
          title:data.data.title,
          body:data.data.body
        })
      }
      // console.log(id);
      // console.log('data hi'+data)
    }

  async function handleUpdate(e){
    e.preventDefault();
    const res = await fetch(`/api/posts/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body:JSON.stringify(formData)
    })
    const data = await res.json();
    console.log(data);


    if(data.errors){
      setErrors(data.errors)
    }else{
      navigate('/');
    }
    // console.log(data);
  }
  useEffect(()=>{
    getPost();
  },[id]);


  return (
    <>
     <h1 className='title'>Update a new post</h1>

     <form onSubmit={handleUpdate} className='w-1/2 mx-auto space-y-6'>
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
        <button className='primary-btn'>Update</button>
     </form>
    </>
  )
}

export default Update