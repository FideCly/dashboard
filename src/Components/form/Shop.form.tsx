import React, { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IShopCreatePayload, IShopUpdatePayload, IShop  } from '@/Api/Models/Shop'
import { ShopService } from '@/Api/Services/index'
import {
  Autocomplete,
  useLoadScript,
} from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode, getLatLng,
} from 'use-places-autocomplete';

export const ShopCreateForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IShopCreatePayload>()

  const [shops, setShops] = useState<IShop[]>([])

  const onSubmit: SubmitHandler<IShopCreatePayload> = useCallback(async (data) => {
    try {
      await ShopService.createShop(data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const loadShops = useCallback(async () => {
    try {
      const { data } = await ShopService.getShops()
      setShops(data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  React.useEffect(() => {
    loadShops()
  }, [loadShops])

  const libraries = ["places"];
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries: libraries as any,
  })

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="submit-form">
        <div>
          <div className="form-group">
            <input
              {...register('companyName', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={50}
              placeholder='companyName'
            />
            {errors.companyName && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <PlacesAutocomplete
            />      
          </div> 

          <div className="form-group">
            <input
              {...register('phone', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={50}
              placeholder='phone'
            />
            {errors.phone && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <input
              {...register('email', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={50}
              placeholder='email'
            />
            {errors.email && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <input
              {...register('siren', { required: true, maxLength: 9 })}
              type=""
              className="w-full max-w-xs input"
              id="name"
              maxLength={9}
              placeholder='siren'
            />
            {errors.siren && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <input
              {...register('siret', { required: true, maxLength: 14 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={14}
              placeholder='siret'
            />
            {errors.siret && <span>This field is required</span>}
          </div>
          <button type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export const ShopUpdateForm: React.FC <{shop: IShop}> = ({shop}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<IShopUpdatePayload>({
    defaultValues: {
      companyName: shop.companyName,
      address: shop.address,
      phone: shop.phone,
      email: shop.email,
      siren: shop.siren,
      siret: shop.siret,
    }
  })

  const [shops, setShops] = useState<IShop[]>([])

  const onSubmit: SubmitHandler<IShopUpdatePayload> = useCallback(async (data) => {
    try {
      await ShopService.updateShop(shop.id.toString(), data)
    } catch (error) {
      console.error(error)
    }
  }, [shop.id])

  const loadShops = useCallback(async () => {
    try {
      const { data } = await ShopService.getShops()
      setShops(data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  React.useEffect(() => {
    loadShops()
  }, [loadShops])

  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} data-cy='create-shop-form'>
      <div className="submit-form">
        <div>
          <div className="form-group">
            <input
              {...register('companyName', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={50}
              placeholder='companyName'
            />
            {errors.companyName && <span>This field is required</span>}
          </div>
          
          <div className="form-group">
        
            {errors.address && <span>This field is required</span>}
          </div>
          
          <div className="form-group">
            <input
              {...register('zipCode', { required: true, maxLength: 50 })}
              type="text" 
              className="w-full max-w-xs input"
              id="name"
              maxLength={50}
              placeholder='zipCode'
            />
            {errors.zipCode && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <input
              {...register('phone', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={50}
              placeholder='phone'
            />
            {errors.phone && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <input
              {...register('email', { required: true, maxLength: 50 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={50}
              placeholder='email'
            />
            {errors.email && <span>This field is required</span>}
          </div>
          
          <div className="form-group">
            <input
              {...register('siren', { required: true, maxLength: 9 })}
              type=""
              className="w-full max-w-xs input"
              id="name"
              maxLength={9}
              placeholder='siren'
            />
            {errors.siren && <span>This field is required</span>}
          </div>

          <div className="form-group">
            <input
              {...register('siret', { required: true, maxLength: 14 })}
              type="text"
              className="w-full max-w-xs input"
              id="name"
              maxLength={14}
              placeholder='siret'
            />
            {errors.siret && <span>This field is required</span>}
          </div>

          
          <button type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
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
    requestOptions: { componentRestrictions: { country: 'France' } },
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
