import { useEffect, useState } from 'react'
import {IPromotions} from '@/Api/Models/Promotions'
import { PromotionService } from '@/Api/Services'
export default function PromotionList () {
  const [promotions, setPromotions] = useState<IPromotions[]>([])
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
          <span>{promotion.checkoutLimit}</span>
          <span>{promotion.shopId}</span>
          <span>{promotion.startAt?.toString()}</span>
          <span>{promotion.endAt.toString()}</span>
          
          {/* edit button */}
            <a href={`/promotion/${promotion.id}/edit`} >
              PromotionEditById
            </a>
          {/* delete button */}

        </div>
      ))}
    </div>
  )
}
