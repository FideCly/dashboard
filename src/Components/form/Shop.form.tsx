import React, { useCallback, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IShopCreatePayload, IShopUpdatePayload, IShop } from '@/Api/Models/Shop'
import { ShopService } from '@/Api/Services/index'
import { usePlacesWidget } from "react-google-autocomplete";
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { getSession } from 'next-auth/react';

function extractFromAdress(components, type){
  for (var i=0; i<components.length; i++)
   for (var j=0; j<components[i].types.length; j++)
    if (components[i].types[j]==type) return components[i].long_name;
   return "";
 }

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
      const session = await getSession()
      console.log(session)

      const { data } = await ShopService.getShops(session.user.email)
      setShops(data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
      console.log(place)
      var  lat  = place.geometry.location.lat.toString();
      var long = place.geometry.location.lng.toString();
      var zipCode = extractFromAdress(place.address_components, "postal_code");
    }
  });

  React.useEffect(() => {
    loadShops()
  }, [loadShops])


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 dark:text-white">
      <div className="">
        <Label htmlFor="companyName" className='dark:text-white'>Company Name</Label>
        <TextInput
          {...register('companyName', { required: true, maxLength: 50 })}
          type="text"

          id="name"
          maxLength={50}
          placeholder='companyName'
        />
        {errors.companyName && <span>Ce champ est requis</span>}
      </div>

      <div className="">
      <Label htmlFor='phone' className='dark:text-white'>Adress</Label>
      <TextInput
      {...register('address', { required: true, maxLength: 50 })}
          type="text"
          id="adress"
          maxLength={50}
          placeholder='2 rue test'
          ref={ref}
        />
      </div>

      <div className="">
        <Label htmlFor='phone' className='dark:text-white'>Numero de telephone</Label>
        <TextInput
          {...register('phone', { required: true, maxLength: 50 })}
          type="text"
          id="name"
          maxLength={50}
          placeholder='phone'
        />
        {errors.phone && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <Label htmlFor='email' className='dark:text-white'>Email</Label>
        <TextInput
          {...register('email', { required: true, maxLength: 50 })}
          type="text"

          id="name"
          maxLength={50}
          placeholder='email'
        />
        {errors.email && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <Label htmlFor='siren' className='dark:text-white'>Siren</Label>
        <TextInput
          {...register('siren', { required: true, maxLength: 9 })}
          type="text"

          id="name"
          maxLength={9}
          placeholder='siren'
        />
        {errors.siren && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <Label htmlFor='siret' className='dark:text-white'>Siret</Label>
        <TextInput
          {...register('siret', { required: true, maxLength: 14 })}
          type="text"
          id="name"
          placeholder='siret'
        />
        {errors.siret && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <Label htmlFor='activity' className='dark:text-white'>Type de magazin</Label>
        <Select
          {...register('activity', { required: true, maxLength: 14 })}
        >
          <option value="Restauration">Restauration</option>
          <option value="Supply">Supply</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Store">Store</option>
          <option value="Service">Service</option>
        </Select>
      </div>
      <Button type="submit" className='text-black bg-green-200 hover:bg-green-300'>
        Submit
      </Button>
    </form>
  )
}

export const ShopUpdateForm: React.FC<{ shop: IShop }> = ({ shop }) => {
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
      <div className="">
        <TextInput
          {...register('companyName', { required: true, maxLength: 50 })}
          type="text"

          id="name"
          maxLength={50}
          placeholder='companyName'
        />
        {errors.companyName && <span>Ce champ est requis</span>}
      </div>

      <div className="">

        {errors.address && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <TextInput
          {...register('zipCode', { required: true, maxLength: 50 })}
          type="text"

          id="name"
          maxLength={50}
          placeholder='zipCode'
        />
        {errors.zipCode && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <TextInput
          {...register('phone', { required: true, maxLength: 50 })}
          type="text"

          id="name"
          maxLength={50}
          placeholder='phone'
        />
        {errors.phone && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <TextInput
          {...register('email', { required: true, maxLength: 50 })}
          type="text"

          id="name"
          maxLength={50}
          placeholder='email'
        />
        {errors.email && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <TextInput
          {...register('siren', { required: true, maxLength: 9 })}
          type=""

          id="name"
          maxLength={9}
          placeholder='siren'
        />
        {errors.siren && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <TextInput
          {...register('siret', { required: true, maxLength: 14 })}
          type="text"

          id="name"
          maxLength={14}
          placeholder='siret'
        />
        {errors.siret && <span>Ce champ est requis</span>}
      </div>

      <Button className='text-black bg-green-200 hover:bg-green-300' type="submit">
        Submit
      </Button>
    </form>
  )
}
