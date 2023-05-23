import { useEffect, useState } from 'react'
import { CampaignServices } from '@/Api/Services'
import { ICampaign } from '@/Api/Models/Campaign'

export default function CampaignList () {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  // get campaigns by shop id

  useEffect(() => {
    const getCampaignsByShopId = async () => {
      try {
        setIsLoading(true)
        const response = await CampaignServices.getCampaigns()
        setCampaigns(response.data)
      } catch (error) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    getCampaignsByShopId()
  }, [])
  if (isLoading) {
    return <div>loading....</div>
  }

  if (error) {
    return (
      <div>
        <span>Erreur lors du chargement de  promotions</span>
      </div>
    )
  }
  return (
    <div>
      <h1>Campaigns</h1>
      {campaigns.map((campaign) => (
        <div key={campaign.id}>
          <h1>{campaign.subject}</h1>
          <p>{campaign.message}</p>
          <p>{campaign.shop.companyName}</p>
          <p>{campaign.targets?.toString()}</p>
        </div>
      ))}
    </div>

  )
}
