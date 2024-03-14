import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(import.meta.env.VITE_SMART_CONTRACT_ADDRESS); // Smart contract address
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
  const navigate = useNavigate();

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      const data = await createCampaign({
        args: [
          address, // Owner
          form.title, // Title
          form.description, // Description
          form.target, // Target amount
          new Date(form.deadline).getTime(), // Deadline
          form.image, // Image
        ],
      });
      navigate('/');
      console.log('Contract call success', data);
      toast.success('Campaign created successfully');
    } catch (error) {
      toast.error('Failed to create campaign');
      console.error('Contract call failed', error);
    }
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns()

    const filteredCampaigns = allCampaigns.filter(campaign => campaign.owner === address)

    return filteredCampaigns
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', [pId], {
      value: ethers.utils.parseEther(amount)
    })
    return data
  }

  const getCampaigns = async () => {
    try {
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      const campaigns = await contract.call('getCampaigns');
      const parsedCampaigns = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        pId: i,
      }));
      return parsedCampaigns;
    } catch (error) {
      console.error('Failed to get campaigns', error);
      return [];
    }
  };

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId])
    const numberOfDonations = donations[0].length
    const parsedDonations = []

    for (let i = 0; i < numberOfDonations; i++) {
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
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
