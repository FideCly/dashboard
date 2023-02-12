import { useEffect, useState } from 'react'
import type Promotions from '../../Api/Models/Promotions'
import { PromotionService } from '../../Api/Services'
export default function PromotionList () {
  const [promotions, setPromotions] = useState<Promotions[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadPromotions = async (): Promise<void> => {
      try {
        setIsLoading(true)
        const response = await PromotionService.getPromotionsByShopId('1')
        setPromotions(response.data)
      } catch (error) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    void loadPromotions()
  }, [])

  if (isLoading) {
    return <div>loading....</div>
  }

  if (error) {
    return (
      <div>
        <span>Error while loading promotions</span>
      </div>
    )
  }

  return (
    <div>
      {promotions.map((promotion) => (
        <div key={promotion.name}>
          <span>{promotion.name}</span>
          <span>{promotion.description}</span>
          <span>{promotion.startAt}</span>
          <span>{promotion.endAt}</span>
        </div>
      ))}
    </div>
  )
}
