import React, { useState, useEffect } from 'react'
import { useStateContext } from '../context'
import { DisplayCampaigns } from '../components'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])
  const { contract, address, getUserCampaings } = useStateContext()

  const fetchCampagins = async () => {
    setIsLoading(true)
    setCampaigns(await getUserCampaings())
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

export default Profile
