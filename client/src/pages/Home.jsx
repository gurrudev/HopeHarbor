import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'

function Home() {

  const [isLoading, setIsLoading] = useState(false)
  const [campaign, setCampaign] = useState([])

  const {address, contract, getCampaigns} = useStateContext()

  const fetchCampaigns =  async() =>{
    setIsLoading(true)
    const data = await getCampaigns()
    setCampaign(data)
    setIsLoading(false)
  }

  useEffect(() =>{
    if(contract) fetchCampaigns()
  },[address, contract])

  return (
    <div>Homie</div>
  )
}

export default Home