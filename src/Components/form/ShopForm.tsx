import React, { useMemo, useState, type ChangeEvent } from 'react'
import type Shop from '../../Api/Models/Shop'
import { ShopService } from '../../Api/Services'
import {
  useLoadScript,

} from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
} from 'use-places-autocomplete';




const ShopForm: React.FC = () => {
  
  const initialShopState: Shop = {
    companyName: '',
    address: '',
    siren: '',
    siret: '',
    zipCode: '',
    phone: '',
    email: '',
    lat: '',
    long: '',
    city: ''
  }
  
  const [shop, setShop] = useState<Shop>(initialShopState)

  const libraries = useMemo(() => ['places'], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }
    


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
      lat: shop.lat,
      long: shop.long,
      city: shop.city
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
          lat: response.data.lat,
          long: response.data.long,
          city: response.data.city
        })
        console.log(response.data)
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
          <PlacesAutocomplete
          onAddressSelect={(address) => {
            getGeocode({ address: address }).then((results) => {
              // get lat long , zip code, city, country from results
              const zipCode = () => {
                const zipCode = results[0].address_components.find(
                  (component) => component.types[0] === 'postal_code'
                );
                return zipCode ? zipCode.long_name : '';
              };
              const city = () => {
                const city = results[0].address_components.find(
                  (component) => component.types[0] === 'locality'
                );
                return city ? city.long_name : '';
              };
              
              const lat = () => results[0].geometry.location.lat().toString();
              const lng = () => results[0].geometry.location.lng().toString();
              setShop({ ...shop, lat: lat(), long: lng(), address: address, zipCode: zipCode() , city: city()});
            });
          }}
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
        <button onClick={saveShop} className="btn btn-success">
          Submit
        </button>
      </div>
    </div>
  )
}

const PlacesAutocomplete = ({
  onAddressSelect,
}: {
  onAddressSelect?: (address: string) => void;
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { componentRestrictions: { country: '' } },
    debounce: 300,
    cache: 86400,
  });

  const renderSuggestions = () => {
    return data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        description,
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={() => {
            setValue(description, false);
            clearSuggestions();
            onAddressSelect && onAddressSelect(description);
          }}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  };

  return (
    <div className="">
      <input
        value={value}
        className=""
        disabled={!ready}
        onChange={(e) => setValue(e.target.value)}
        placeholder="123 Stariway To Heaven"
      />

      {status === 'OK' && (
        <ul className="">{renderSuggestions()}</ul>
      )}
    </div>
  );
};

export default ShopForm
