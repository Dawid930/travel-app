import React from 'react'
import TravelBlocks from './TravelBlocks'
import useFetch from './useFetch'



const Homepage = () => {
    const {data: travels, isPending, error} = useFetch('http://localhost:8000/travels')

    //console.log(travels);
    
  return (
    <div className='homePage'>
        {error && <div>{ error }</div>}
        {isPending && <div>Loading... </div>}
        {travels && <TravelBlocks/>}
    </div>
  )
}

export default Homepage