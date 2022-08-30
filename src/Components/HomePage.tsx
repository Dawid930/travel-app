import React from 'react'
import TravelBlocks from './TravelBlocks'
import useFetch from './useFetch'
import { useGlobalContext } from './UserContext'
import { HomeOutlined, PlusOutlined, TeamOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { UserDiv } from './Style';



const Homepage = () => {
    const {data: travels, error} = useFetch('http://localhost:8000/travels')
    const { user, setUser } = useGlobalContext()
    //console.log(travels);
    
  return (
    <>
    <UserDiv>
      <h3>Welcome {user}</h3>
      <button onClick={() => setUser('asd')}><LogoutOutlined/></button>
    </UserDiv>
    <div className='homePage'>
        {error && <div>{ error }</div>}
        {travels && <TravelBlocks/>}
    </div>
    </>
  )
}

export default Homepage