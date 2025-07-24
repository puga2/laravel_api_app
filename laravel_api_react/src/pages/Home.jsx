import React, { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

const Home = () => {
  const {name} = useContext(AppContext);
  return (
    <>
        <h1 className='title'>Latest Posts {name}</h1>
    </>
  )
}

export default Home