import React, { useState } from 'react'
import { ethers } from 'ethers'
import {profileImg} from '../assets'
import {useLocation} from 'react-router-dom'
import { useStateContext } from '../context'
import {daysLeft, calculateBarPercentage} from '../utils'
import {CountBox} from '../components'

function CampaignDetails() {
  const {state} = useLocation()
  const {getDonations, contract, address} = useStateContext()
  
  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [donators, setDonators] = useState([])

  const remainingDays = daysLeft(state.deadline)
  return (
    <div>
      {isLoading && 'Loading...'}

      <div className='w-full flex md:flex-row flex-col mt-10 gap-[30px]'>
        <div className='flex-1 flex-col'>
          <img src={state.image} alt="campaign" className='w-full h-[410px] object-cover rounded-xl'/>
          <div className='relative w-full h-[5px] bg-[#3a3a43] mt-2'>
            <div className='absolute h-full bg-[#4acd8d]' style={{width: `${calculateBarPercentage(state.target,state.amountCollected)} %`, maxWidth:`100%`}}>

            </div>
          </div>
        </div>

        <div className='flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]'>
          <CountBox title='Days Left' value={remainingDays}/>
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected}/>
          <CountBox title='Total Backers' value={donators.length}/>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails