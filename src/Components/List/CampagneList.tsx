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
    <table className='table w-full'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Start At</th>
          <th>End At</th>
        </tr>
      </thead>
      <tbody>
        {campaigns.map((campaign) => (
          <tr key={campaign.name}>
            <td>{campaign.name}</td>
            <td>{campaign.description}</td>
            <td>{campaign.startAt?.toDateString()}</td>
            <td>{campaign.endAt?.toDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
