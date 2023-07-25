import React, { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IShopCreatePayload, IShopUpdatePayload } from '@/Models/Shop';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const GooglePlacesAutocompleteComponent = ({ error, ...field }) => {
  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        selectProps={{
          ...field,
          isClearable: true,
        }}
      />
      {error && <div style={{ color: 'red' }}>{error.message}</div>}
    </div>
  );
};
export const ShopCreateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit: SubmitHandler<IShopCreatePayload> = useCallback(
    async (data) => {
      try {
        const response = await fetch(`/api/shop`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        await response.json();
        toast('Shop created', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success',
        });
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

  function setMetadata(e: any) {
    setValue('address', e.label);
    geocodeByAddress(e.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setValue('lat', lat);
        setValue('long', lng);
      })
      .catch((error) => console.error('Error', error));
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 dark:text-white"
    >
      <div className="">
        <Label htmlFor="companyName" className="dark:text-white">
          Company Name
        </Label>
        <TextInput
          {...register('companyName', { required: true, maxLength: 50 })}
          type="text"
          id="name"
          maxLength={50}
          placeholder="companyName"
        />
        {errors.companyName && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <Label htmlFor="address" className="dark:text-white">
          Address
        </Label>
        <GooglePlacesAutocompleteComponent
          error={undefined}
          {...register('address', { required: true, maxLength: 50 })}
          onChange={(e) => {
            setMetadata(e);
          }}
        />
      </div>

      <div className="">
        <Label htmlFor="phone" className="dark:text-white">
          Numero de telephone
        </Label>
        <TextInput
          {...register('phone', { required: true, maxLength: 50 })}
          type="text"
          id="name"
          maxLength={50}
          placeholder="phone"
        />
        {errors.phone && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <Label htmlFor="email" className="dark:text-white">
          Email
        </Label>
        <TextInput
          {...register('email', { required: true, maxLength: 50 })}
          type="text"
          id="name"
          maxLength={50}
          placeholder="email"
        />
        {errors.email && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <Label htmlFor="siren" className="dark:text-white">
          Siren
        </Label>
        <TextInput
          {...register('siren', { required: true, maxLength: 9 })}
          type="text"
          id="name"
          maxLength={9}
          placeholder="siren"
        />
        {errors.siren && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <Label htmlFor="siret" className="dark:text-white">
          Siret
        </Label>
        <TextInput
          {...register('siret', { required: true, maxLength: 14 })}
          type="text"
          id="name"
          placeholder="siret"
        />
        {errors.siret && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <Label htmlFor="city" className="dark:text-white">
          City
        </Label>
        <TextInput
          {...register('city', { required: true, maxLength: 14 })}
          type="text"
          id="name"
          placeholder="city"
        />
        {errors.siret && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <Label htmlFor="activity" className="dark:text-white">
          Type de magazin
        </Label>
        <Select {...register('activity', { required: true, maxLength: 14 })}>
          <option value="Restauration">Restauration</option>
          <option value="Supply">Supply</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Store">Store</option>
          <option value="Service">Service</option>
        </Select>
      </div>

      <div className="">
        <Label htmlFor="zipCode" className="dark:text-white">
          zipCode
        </Label>
        <TextInput
          {...register('zipCode', { required: true, maxLength: 14 })}
          type="text"
          id="name"
          placeholder="zipCode"
        />
        {errors.siret && <span>Ce champ est requis</span>}
      </div>
      <TextInput
        {...register('lat', { required: true, maxLength: 14 })}
        type="text"
        id="name"
        placeholder="lat"
        hidden
      />
      <TextInput
        {...register('long', { required: true, maxLength: 14 })}
        type="text"
        id="name"
        placeholder="long"
        hidden
      />
      <Button
        type="submit"
        className="text-black bg-green-200 hover:bg-green-300"
      >
        Submit
      </Button>
    </form>
  );
};

export const ShopUpdateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IShopUpdatePayload>();

  const router = useRouter();
  const id = Number(router.query.id);

  useEffect(() => {
    if (id) {
      const getShop = async (): Promise<void> => {
        try {
          const response = await fetch(`/api/shop/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json(); // Extract JSON data from response
          for (const [key, value] of Object.entries(data)) {
            setValue(key, value);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getShop();
    }
  }, [id]);

  const onSubmit: SubmitHandler<IShopUpdatePayload> = useCallback(
    async (data) => {
      try {
        const res = await fetch(`/api/shop/${data.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (res.status >= 400) {
          toast('Shop not updated', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'error',
          });
        } else {
          toast('Shop updated', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'success',
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );
  return (
    <form onSubmit={handleSubmit(onSubmit)} data-cy="create-shop-form">
      <div className="">
        <TextInput
          {...register('companyName', { required: true, maxLength: 50 })}
          type="text"
          id="name"
          maxLength={50}
          placeholder="companyName"
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
          placeholder="zipCode"
        />
        {errors.zipCode && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <TextInput
          {...register('phone', { required: true, maxLength: 50 })}
          type="text"
          id="name"
          maxLength={50}
          placeholder="phone"
        />
        {errors.phone && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <TextInput
          {...register('email', { required: true, maxLength: 50 })}
          type="text"
          id="name"
          maxLength={50}
          placeholder="email"
        />
        {errors.email && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <TextInput
          {...register('siren', { required: true, maxLength: 9 })}
          type=""
          id="name"
          maxLength={9}
          placeholder="siren"
        />
        {errors.siren && <span>Ce champ est requis</span>}
      </div>

      <div className="">
        <TextInput
          {...register('siret', { required: true, maxLength: 14 })}
          type="text"
          id="name"
          maxLength={14}
          placeholder="siret"
        />
        {errors.siret && <span>Ce champ est requis</span>}
      </div>

      <Button
        className="text-black bg-green-200 hover:bg-green-300"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};
