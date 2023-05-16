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
            <h1>{campaign.libelle}</h1>
            <p>{campaign.template}</p>
            <p>{campaign.types}</p>
            <p>{campaign.startAt?.toString()}</p>
            <p>{campaign.endAt?.toString()}</p>
            </div>
        ))}
        </div>

    )
    }
