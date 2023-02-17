import { useEffect, useState } from 'react'
import type Shop from '../../Api/Models/Shop'
import { ShopService } from '../../Api/Services'

export default function ShopList () {
  const [shops, setShops] = useState<Shop[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadShops = async (): Promise<void> => {
      try {
        const response = await ShopService.getShops()
        setShops(response.data)
      } catch (error) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    void loadShops()
  }, [])

  if (isLoading) {
    return <div>loading....</div>
  }

  if (error) {
    return (
      <div>
        <span>Error while loading shops</span>
      </div>
    )
  }

  return (
    <div>
      {shops.map((shop) => (
        <div key={shop.companyName}>
          <span>{shop.companyName}</span>
          <span>{shop.address}</span>
          <span>{shop.zipCode}</span>
          <span>{shop.phone}</span>
          <span>{shop.email}</span>
          <span>{shop.lat}</span>
          <span>{shop.long}</span>
        </div>
      ))}
    </div>
  )
}
