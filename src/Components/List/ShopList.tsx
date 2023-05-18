import { useEffect, useState } from 'react'
import type {IShop} from '../../Api/Models/Shop'
import { ShopService } from '../../Api/Services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { getSession } from 'next-auth/react';

export default function ShopList () {
  const [shops, setShops] = useState<IShop[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadShops = async (): Promise<void> => {
      try {
        setIsLoading(true)
        const session = await getSession()
        console.log(session)
        const response = await ShopService.getShops(session.user.email)
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
        <span>Erreur lors du chargement de  shops</span>
      </div>
    )
  }

  return (
    <table className='table w-full'>
    <thead>
      <tr>
        <th>Company Name</th>
        <th>Address</th>
        <th>Zip Code</th>
        <th>Phone</th>
        <th>Email</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {shops.map((shop) => (
        <tr key={shop.id}>
          <th>{shop.companyName}</th>
          <th>{shop.address}</th>
          <th>{shop.zipCode}</th>
          <th>{shop.phone}</th>
          <th>{shop.email}</th>
          <th className='space-x-2'>
            <a href=""><FontAwesomeIcon icon={faEdit} /></a>
            <a href=""><FontAwesomeIcon icon={faTrash} /></a>
          </th>
        </tr>
      ))}
    </tbody>
  </table>
  )
}
