import { useEffect, useState } from 'react'
import {IPromotions} from '../../Api/Models/Promotions'
import { PromotionService } from '../../Api/Services'
export default function CampagneList () {
  const [campaigns, setCampaigns] = useState<IPromotions[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadCampagnes = async (): Promise<void> => {
      try {
        setIsLoading(true)
        const response = await PromotionService.getPromotions()
        setCampaigns(response.data)
      } catch (error) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    void loadCampagnes()
  }, [])

  if (isLoading) {
    return <div>loading....</div>
  }

  if (error) {
    return (
      <div>
        <span>Error while loading campaigns</span>
      </div>
    )
  }

  return (
    <div>
      {campaigns.map((campaign) => (
        <div key={campaign.name}>
          <span>{campaign.name}</span>
          <span>{campaign.description}</span>
          <span>{campaign.startAt?.toDateString()}</span>
          <span>{campaign.endAt?.toDateString()}</span>
        </div>
      ))}
    </div>
  )
}
