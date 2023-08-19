import React ,{useContext, createContext} from 'react'
import {useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react'
import {ethers} from 'ethers'

const StateContext = createContext()

export const StateContextProvider = ({children}) => {
  const {contract} = useContract('0x44E07405Cd5930a22Ee8abCB1CEb285517111706')
  const {mutateAsync: createCampaign} = useContractWrite(contract, 'createCampaign')

  const address = useAddress()
  const connect = useMetamask()

  const publishCampaign = async(form) =>{

    try {
      
      const data = await createCampaign([
        address, //Owner
        form.title, //Title
        form.description, //Description
        form.target, 
        new Date(form.deadline).getTime(), //Deadline
        form.image
      ])

      console.log('Contract call success', data)
    } catch (error) {
      console.log('Contract call failure', error)
    }
  }

  return (
    <StateContext.Provider 
      value={{
        address,
        contract,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  )

}

export const useStateContext = () => useContext(StateContext)