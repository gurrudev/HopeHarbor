import React, { useState } from 'react'
import { ethers } from 'ethers'
import { profileImg } from '../assets'
import { useLocation } from 'react-router-dom'
import { useStateContext } from '../context'
import { daysLeft, calculateBarPercentage } from '../utils'
import { CountBox, CustomButton } from '../components'

function CampaignDetails() {
  const { state } = useLocation()
  const { getDonations, contract, address } = useStateContext()

  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState('')
  const [donators, setDonators] = useState([])

  const remainingDays = daysLeft(state.deadline)


  const handleDonate = () =>{
    
  }

  return (
    <div>
      {isLoading && 'Loading...'}

      <div className='w-full flex md:flex-row flex-col mt-10 gap-[30px]'>
        <div className='flex-1 flex-col'>
          <img src={state.image} alt="campaign" className='w-full h-[410px] object-cover rounded-xl' />
          <div className='relative w-full h-[5px] bg-[#3a3a43] mt-2 rounded'>
            <div className='absolute h-full bg-[#4acd8d] rounded' style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)} %`, maxWidth: `100%` }}>

            </div>
          </div>
        </div>

        <div className='flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]'>
          <CountBox title='Days Left' value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title='Total Backers' value={donators.length} />
        </div>
      </div>

      <div className='mt-[60px] flex lg:flex-row flex-col gap-5'>
        <div className='flex-[2] flex flex-col gap-[40px]'>
          <div>
            <h4 className='font-epilogue text-left font-semibold text-[18px] uppercase'>Creator</h4>
            <div className='mt-[20px] flex flex-row items-center flex-wrap gap-[14px] '>
              <div className='w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer'>
                <img src={profileImg} alt="user" className='w-[70%] h-[70%] object-contain'/>
              </div>
              <div>
                <h4 className='font-epilogue font-semibold text-[14px] break-all'>{state.owner}</h4>
                <p className='mt-[4px] font-epilogue font-normal text-[14px] text-[#808191]'>10 Campaigns</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className='font-epilogue text-left font-semibold text-[18px] uppercase'>Story</h4>
            <div className='mt-20px'>
              <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'>{state.description}</p>
            </div>
          </div>

          <div>
            <h4 className='font-epilogue text-left font-semibold text-[18px] uppercase'>Donators</h4>
            <div className='mt-20px flex flex-col gap-4'>

              {donators.length > 0 ? donators.map((item, 
                index) =>{
                    <div>
                      DONATOR
                    </div>
                }) : (
                  <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'>No donators yet. Be the first one!</p>
                )
              }
            </div>
          </div>
        </div>

        <div className='flex-1 '>
        <h4 className='font-epilogue text-left font-semibold text-[18px] uppercase'>Fund</h4>
          <div className='mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]'>
            <p className='font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#809191]'>Fund The Campaign</p>
            <div className='mt-[30px]'>
              <input 
                type="number" 
                placeholder='ETH 0.1'
                step='0.0001'
                className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-2 border-[#3a3a43] bg-transparent font-epilogue text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className='mt-[20px] p-4 bg-[#13131a]'>
                <h4 className='font-epilogue font-semibold text-[16px] leading-[22px]'>Back it because you believe in it.</h4>
                <p className='mt-[10px] font-epilogue font-normal leading-[22px] text-[#808191]'>Support the campaign for no reward, just because it speaks to you</p>
              </div>
              <CustomButton
                btnType='button'
                title='Fund Campaign'
                styles='w-full bg-[#8c6dfd] mt-[20px]'
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails