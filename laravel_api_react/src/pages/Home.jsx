import React, { useContext, useEffect, useState } from 'react'
import  { AppContext } from '../Context/AppContext'
import { Link } from 'react-router-dom';

const Home = () => {
  // const {token} = useContext(AppContext);
  const [posts,setPost] = useState([]);
  const {name} = useContext(AppContext);
  async function getPosts(){
    const res = await fetch('/api/posts',
    //  { method:"Get",headers:{Authorization:`Bearer ${token}`}}


    );
    const data = await res.json();
    setPost(data);
    // console.log(data);
  }

  useEffect(()=>{
    getPosts();
  } ,[]);
  // if array is empty, it will not re-run the effect
  
  return (
    <>
        <h1 className='title'>Latest Posts {name}</h1>
        {posts.length > 0 ? (
          posts.map((post)=>(
            <div key={post.id} className='mb-4 p-4 border rounded-md border-dashed border-slate-400'>
              <div className='mb-2 flex items-start justify-between'>
                <div>
                  <h2 className='font-bold text-2xl'>{post.title}</h2>
                  <small className='text-xs text-slate-600'>
                    Create by {post.user.name} on  {" "}
                    {new Date(post.created_at).toLocaleTimeString()}
                  </small>
                </div>
                <Link to={`/posts/${post.id}`} className='bg-blue-500 text-white text-sm rounded-lg px-3 py-1'>Read more</Link>
              </div>
              <p>{post.body}</p>
            </div>
          ))
        ):
          <p>There no post</p>
        }
    </>
  )
}

export default Home