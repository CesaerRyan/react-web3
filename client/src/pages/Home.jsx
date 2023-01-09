import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'
import { DisplayCampaigns } from '../components'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])
  const { contract, address, getCampaigns } = useStateContext()

  const fetchCampagins = async () => {
    setIsLoading(true)
    setCampaigns(await getCampaigns())
    setIsLoading(false)
  }

  useEffect(() => {
    if (contract) fetchCampagins()
  }, [address, contract])

  return (
    <div>
      <DisplayCampaigns
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      ></DisplayCampaigns>
    </div>
  )
}

export default Home
