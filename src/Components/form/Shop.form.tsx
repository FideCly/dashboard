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
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IShopCreatePayload>({ mode: 'onChange' });

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
        if (response.status >= 400) {
          toast('Shop not created', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'error',
          });
        } else {
          toast('Shop created', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'success',
          });
          router.push('/');
        }
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
        setValue('lat', lat.toString());
        setValue('long', lng.toString());
      })
      .catch((error) => console.error('Error', error));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="">
        <Label htmlFor="companyName" className="">
          Nom du shop
        </Label>
        <TextInput
          {...register('companyName', {
            required: 'Le nom du shop est requis',
            maxLength: 50,
          })}
          type="text"
          id="companyName"
          maxLength={50}
          placeholder="Nom du shop"
        />
        {errors.companyName && (
          <span className="text-sm text-red-600">
            {errors.companyName.message.toString()}
          </span>
        )}
      </div>

      <div className="">
        <Label htmlFor="activity" className="">
          Activité du shop
        </Label>
        <Select
          {...register('activity', {
            required: "L'activité du shop est requise",
          })}
        >
          <option value="Restauration">Restauration</option>
          <option value="Supply">Alimentation</option>
          <option value="Entertainment">Divertissement</option>
          <option value="Store">Magasin</option>
          <option value="Service">Service</option>
        </Select>
        {errors.activity && (
          <span className="text-sm text-red-600">
            {errors.activity.message.toString()}
          </span>
        )}
      </div>

      <div className="">
        <Label htmlFor="email" className="">
          Email
        </Label>
        <TextInput
          {...register('email', {
            required: "L'email est requis",
            maxLength: 50,
          })}
          type="text"
          id="email"
          maxLength={50}
          placeholder="hello@fidelcly.com"
        />
        {errors.email && (
          <span className="text-sm text-red-600">
            {errors.email.message.toString()}
          </span>
        )}
      </div>

      <div className="">
        <Label htmlFor="phone" className="">
          Numéro de téléphone
        </Label>
        <TextInput
          {...register('phone', {
            required: 'Le numéro de téléphone est requis',
            maxLength: 10,
          })}
          type="text"
          id="phone"
          maxLength={10}
          placeholder="0XXXXXXXXX"
        />
        {errors.phone && (
          <span className="text-sm text-red-600">
            {errors.phone.message.toString()}
          </span>
        )}
      </div>

      <div className="">
        <Label htmlFor="siren" className="">
          Siren
        </Label>
        <TextInput
          {...register('siren', {
            required: 'Le siren est requis',
            maxLength: 9,
          })}
          type="text"
          id="phone"
          maxLength={9}
          placeholder="XXXXXXXXX"
        />
        {errors.siren && (
          <span className="text-sm text-red-600">
            {errors.siren.message.toString()}
          </span>
        )}
      </div>

      <div className="">
        <Label htmlFor="siret" className="">
          Siret
        </Label>
        <TextInput
          {...register('siret', {
            required: 'Le siret est requis',
            maxLength: 14,
          })}
          type="text"
          id="siret"
          maxLength={14}
          placeholder="XXXXXXXXXXXXXX"
        />
        {errors.siret && (
          <span className="text-sm text-red-600">
            {errors.siret.message.toString()}
          </span>
        )}
      </div>

      <div className="">
        <Label htmlFor="address" className="">
          Adresse
        </Label>
        <GooglePlacesAutocompleteComponent
          error={undefined}
          {...register('address', {
            required: "L'adresse est requise",
            maxLength: 50,
          })}
          onChange={(e) => {
            setMetadata(e);
          }}
        />
        {errors.address && (
          <span className="text-sm text-red-600">
            {errors.address.message.toString()}
          </span>
        )}
      </div>

      <div className="">
        <Label htmlFor="city" className="">
          Ville
        </Label>
        <TextInput
          {...register('city', {
            required: 'La ville est requise',
            maxLength: 20,
          })}
          type="text"
          id="city"
          placeholder="Paris"
        />
        {errors.city && (
          <span className="text-sm text-red-600">
            {errors.city.message.toString()}
          </span>
        )}
      </div>

      <div className="">
        <Label htmlFor="zipCode" className="">
          Code Postal
        </Label>
        <TextInput
          {...register('zipCode', {
            required: 'Le code postal est requis',
            maxLength: 14,
          })}
          type="text"
          id="zipCode"
          placeholder="XXXXX"
        />
        {errors.zipCode && (
          <span className="text-sm text-red-600">
            {errors.zipCode.message.toString()}
          </span>
        )}
      </div>

      <Button
        type="submit"
        className="text-gray-50 bg-fidgreen hover:bg-fidgreen/80"
      >
        Enregistrer
      </Button>
    </form>
  );
};

export const ShopUpdateForm: React.FC = () => {
  const router = useRouter();
  const id = Number(router.query.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IShopUpdatePayload>({ mode: 'onChange' });

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
          setValue('id', data.id);
          setValue('companyName', data.companyName);
          setValue('address', data.address);
          setValue('phone', data.phone);
          setValue('email', data.email);
          setValue('siren', data.siren);
          setValue('siret', data.siret);
          setValue('city', data.city);
          setValue('zipCode', data.zipCode);
          setValue('lat', data.lat);
          setValue('long', data.long);
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

  function setMetadata(e: any) {
    setValue('address', e.label);
    geocodeByAddress(e.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setValue('lat', lat.toString());
        setValue('long', lng.toString());
      })
      .catch((error) => console.error('Error', error));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-cy="create-shop-form">
      <div className="">
        <Label htmlFor="companyName" className="">
          Nom du shop
        </Label>
        <TextInput
          {...register('companyName', {
            required: 'Le nom du shop est requis',
            maxLength: 50,
          })}
          type="text"
          id="companyName"
          maxLength={50}
          placeholder="Nom du shop"
        />
        {errors.companyName && (
          <span className="text-sm text-red-600">
            {errors.companyName.message.toString()}
          </span>
        )}
      </div>

      <div className="">
        <Label htmlFor="activity" className="">
          Activité du shop
        </Label>
        <Select
          {...register('activity', {
            required: "L'activité du shop est requise",
          })}
        >
          <option value="Restauration">Restauration</option>
          <option value="Supply">Alimentation</option>
          <option value="Entertainment">Divertissement</option>
          <option value="Store">Magasin</option>
          <option value="Service">Service</option>
        </Select>
        {errors.activity && (
          <span className="text-sm text-red-600">
            {errors.activity.message.toString()}
          </span>
        )}
      </div>

      <div className="">
        <Label htmlFor="email" className="">
          Email
        </Label>
        <TextInput
          {...register('email', {
            required: "L'email est requis",
            maxLength: 50,
          })}
          type="text"
          id="email"
          maxLength={50}
          placeholder="hello@fidelcly.com"
        />
        {errors.email && (
          <span className="text-sm text-red-600">
            {errors.email.message.toString()}
          </span>
        )}
      </div>

      <div className="">
        <Label htmlFor="phone" className="">
          Numéro de téléphone
        </Label>
        <TextInput
          {...register('phone', {
            required: 'Le numéro de téléphone est requis',
            maxLength: 50,
          })}
          type="text"
          id="phone"
          maxLength={50}
          placeholder="0XXXXXXXXX"
        />
        {errors.phone && (
          <span className="text-sm text-red-600">
            {errors.phone.message.toString()}
          </span>
        )}
      </div>

      <div className="">
        <Label htmlFor="siren" className="">
          Siren
        </Label>
        <TextInput
          {...register('siren', {
            required: 'Le siren est requis',
            maxLength: 9,
          })}
          type="text"
          id="siren"
          maxLength={9}
          placeholder="XXXXXXXXX"
        />
        {errors.siren && (
          <span className="text-sm text-red-600">
            {errors.siren.message.toString()}
          </span>
        )}
      </div>

      <div className="">
        <Label htmlFor="siret" className="">
          Siret
        </Label>
        <TextInput
          {...register('siret', {
            required: 'Le siret est requis',
            maxLength: 14,
          })}
          type="text"
          id="siret"
          maxLength={14}
          placeholder="XXXXXXXXXXXXXX"
        />
        {errors.siret && (
          <span className="text-sm text-red-600">
            {errors.siret.message.toString()}
          </span>
        )}
      </div>

      <div className="">
        <Label htmlFor="address" className="">
          Adresse
        </Label>
        <GooglePlacesAutocompleteComponent
          error={undefined}
          {...register('address', {
            required: "L'adresse est requise",
            maxLength: 50,
          })}
          onChange={(e) => {
            setMetadata(e);
          }}
        />
        {errors.address && (
          <span className="text-sm text-red-600">
            {errors.address.message.toString()}
          </span>
        )}
      </div>

      <div className="">
        <Label htmlFor="city" className="">
          Ville
        </Label>
        <TextInput
          {...register('city', {
            required: 'La ville est requise',
            maxLength: 20,
          })}
          type="text"
          id="city"
          placeholder="Paris"
        />
        {errors.city && (
          <span className="text-sm text-red-600">
            {errors.city.message.toString()}
          </span>
        )}
      </div>

      <div className="">
        <Label htmlFor="zipCode" className="">
          Code Postal
        </Label>
        <TextInput
          {...register('zipCode', {
            required: 'Le code postal est requis',
            maxLength: 14,
          })}
          type="text"
          id="zipCode"
          placeholder="XXXXX"
        />
        {errors.zipCode && (
          <span className="text-sm text-red-600">
            {errors.zipCode.message.toString()}
          </span>
        )}
      </div>

      <Button
        type="submit"
        className="text-gray-50 bg-fidgreen hover:bg-fidgreen/80"
      >
        Enregistrer
      </Button>
    </form>
  );
};
