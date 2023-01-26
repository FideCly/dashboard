import { useEffect, useState } from 'react'
import type Promotions from '../../Api/Models/Promotions'
import { PromotionService } from '../../Api/Services'
export default function CampagneList (): JSX.Element {
  const [campaigns, setCampaigns] = useState<Promotions[]>([])
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
          <span>{campaign.startAt}</span>
          <span>{campaign.endAt}</span>
        </div>
      ))}
    </div>
  )
}
