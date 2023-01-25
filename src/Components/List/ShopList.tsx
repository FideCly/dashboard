import { useEffect, useState } from 'react'
import type Shop from '../../Api/Models/Shop'
import { ShopService } from '../../Api/Services'
import { Placeholder } from 'semantic-ui-react'

export default function ShopList (): JSX.Element {
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
    return <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Adresse</th>
              <th>Zipcode</th>
              <th>phone</th>
              <th>email</th>
              <th>geoloc</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Placeholder>
                  <Placeholder.Line />
                </Placeholder>
              </th>
              <th>              <Placeholder>
                <Placeholder.Line />
              </Placeholder></th>
              <th>              <Placeholder>
                <Placeholder.Line />
              </Placeholder></th>
              <th>              <Placeholder>
                <Placeholder.Line />
              </Placeholder></th>
              <th>              <Placeholder>
                <Placeholder.Line />
              </Placeholder></th>
              <th>              <Placeholder>
                <Placeholder.Line />
              </Placeholder></th>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  }

  if (error) {
    return (
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Adresse</th>
                <th>Zipcode</th>
                <th>phone</th>
                <th>email</th>
                <th>geoloc</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colSpan={4} className='text-4xl font-bold text-center'>
                  OH no! A error has occured....
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Adresse</th>
            <th>Zipcode</th>
            <th>phone</th>
            <th>email</th>
            <th>geoloc</th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop) => (
            <tr key={shop.companyName}>
              <th>{shop.companyName}</th>
              <th>{shop.address}</th>
              <th>{shop.zipCode}</th>
              <th>{shop.phone}</th>
              <th>{shop.email}</th>
              <th>{shop.geoloc}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
