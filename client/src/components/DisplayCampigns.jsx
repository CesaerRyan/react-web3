import React from 'react'

import { useNavigate } from 'react-router-dom'
import { loader } from '../assets'

const DisplayCampigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate()
  const handleNavigate = (campaign)=>{
    navigate(`/campagin-details/${campaign.title}`,{state:campaign})
  }


  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          ></img>
        )}
        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            {' '}
            There is no more campaign
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((camp) => (
         

         
              <FundCard
            
            key={`fund`+camp.id}
            {...camp}
            handleClick={() => {
              handleNavigate(camp)
            }}
          />
          
          
          ))}
      </div>
    </div>
  )
}

export default DisplayCampigns






export const FundCard = () => {
  return (
    <div>FundCard</div>
  )
}
