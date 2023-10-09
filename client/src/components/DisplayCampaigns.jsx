import React from 'react'
import { loader } from '../assets'
import { useNavigate } from 'react-router-dom'
import {FundCard} from '../components'

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {

    const navigate = useNavigate()

    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, {state: campaign})
    }

    return (
        <div>
            <h1 className='font-epilogue font-semibold text-[18px] text-left'>{title} ({campaigns.length})</h1>

            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {isLoading && (
<<<<<<< Updated upstream
                    <img src={loader} alt='loader' className='w-[100px] h-[100px] object-contain'/>
=======
                    <img src={loader} alt='loader' className='w-[100px] h-[100px] object-contain' />
>>>>>>> Stashed changes
                )}

                {!isLoading && campaigns.length === 0 && (
                    <p className='font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]'>You have not created any campaigns yet</p>
                )}

                {!isLoading && campaigns.length > 0 && campaigns.map(
                    (campaign) => <FundCard
                        key={campaign.id}
                        {...campaign}
                        handleClick={() => handleNavigate(campaign)}
                    />)
                }
            </div>
        </div>
    )
}

export default DisplayCampaigns