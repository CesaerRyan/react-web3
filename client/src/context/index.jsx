import React, { useContext, createContext } from 'react'
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { Config } from '../constants'

const StateContext = createContext()
export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(Config.CONTRACT_ADDRESS)

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    'createCampaign'
  )

  const address = useAddress()
  const connect = useMetamask()

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ])
      console.log('contract call success', data)
    } catch (error) {
      console.error('contract error', error)
    }
  }
  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns')

    const parsedCampagins = campaigns.map((camp, i) => ({
      owner: camp.owner,
      title: camp.title,
      description: camp.description,
      target: ethers.utils.formatEther(camp.target.toString()),
      deadline: camp.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        camp.amountCollected.toString()
      ),
      image: camp.image,
      id: i,
    }))

    return parsedCampagins
  }

  const getUserCampaings = async () => {
    const allCampaigns = await getCampaigns()
    const filterC = allCampaigns.filter((camp) => camp.owner === address)
    return filterC
  }
  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', pId, {
      value: ethers.utils.parseEther(amount),
    })
    return data
  }
  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', pId)

    const numberofDonations = donations[0].length
    const parsedDonations = []
    for (let i = 0; i < numberofDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i]).toString(),
      })
    }
    return parsedDonations
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaings,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
