import React, { useState, type ChangeEvent } from 'react'
import type Shop from '../../Api/Models/Shop'
import { ShopService } from '../../Api/Services'
import { toast } from 'react-toastify'

const ShopForm: React.FC = () => {
  const initialShopState: Shop = {
    companyName: '',
    address: '',
    siren: '',
    siret: '',
    zipCode: '',
    phone: '',
    email: '',
    geoloc: ''
  }
  const [shop, setShop] = useState<Shop>(initialShopState)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setShop({ ...shop, [name]: value })
  }

  const saveShop = (): void => {
    const data = {
      companyName: shop.companyName,
      address: shop.address,
      siren: shop.siren,
      siret: shop.siret,
      zipCode: shop.zipCode,
      phone: shop.phone,
      email: shop.email,
      geoloc: shop.geoloc
    }

    ShopService.createShop(data)
      .then((response: any) => {
        setShop({
          companyName: response.data.companyName,
          address: response.data.address,
          siren: response.data.siren,
          siret: response.data.siret,
          zipCode: response.data.zipCode,
          phone: response.data.phone,
          email: response.data.email,
          geoloc: response.data.geoloc
        })
        toast.success('The shop was created successfully!')
      })
      .catch((e: Error) => {
        console.log(e)
      })
  }

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            className="form-control"
            id="companyName"
            required
            value={shop.companyName}
            onChange={handleInputChange}
            name="companyName"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            required
            value={shop.address}
            onChange={handleInputChange}
            name="address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="siren">Siren</label>
          <input
            type="text"
            className="form-control"
            id="siren"
            required
            value={shop.siren}
            onChange={handleInputChange}
            name="siren"
          />
        </div>

        <div className="form-group">
          <label htmlFor="siret">Siret</label>
          <input
            type="text"
            className="form-control"
            id="siret"
            required
            value={shop.siret}
            onChange={handleInputChange}
            name="siret"
          />
        </div>

        <div className="form-group">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            className="form-control"
            id="zipCode"
            required
            value={shop.zipCode}
            onChange={handleInputChange}
            name="zipCode"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            required
            value={shop.phone}
            onChange={handleInputChange}
            name="phone"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            required
            value={shop.email}
            onChange={handleInputChange}
            name="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="geoloc">Geoloc</label>
          <input
            type="text"
            className="form-control"
            id="geoloc"
            required
            value={shop.geoloc}
            onChange={handleInputChange}
            name="geoloc"
          />
        </div>

        <button onClick={saveShop} className="btn btn-success">
          Submit
        </button>
      </div>
    </div>
  )
}

export default ShopForm
