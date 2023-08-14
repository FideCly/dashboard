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
import { IUser } from '@/Models/User';

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
      const toastid = toast.loading('creating shop...');
      const response = await fetch(`/api/shop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status >= 400) {
        // read the response body
        const body = await response.json();
        toast.update(toastid, {
          render: `Shop not created: ${body.message}`,
          type: 'error',
          autoClose: 2000,
          isLoading: false,
        });
      } else {
        toast.update(toastid, {
          render: 'Shop created',
          type: 'success',
          autoClose: 2000,
          isLoading: false,
        });
        router.push('/');
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
            maxLength: {
              value: 50,
              message: 'Le nom ne doit pas dépasser 50 caractères',
            },
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
            maxLength: {
              value: 50,
              message: "L'email ne doit pas dépasser 50 caractères",
            },
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
            maxLength: {
              value: 10,
              message: 'Le numéro de téléphone doit contenir 10 caractères',
            },
          })}
          type="number"
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
            maxLength: {
              value: 9,
              message: 'Le siren doit contenir 9 caractères',
            },
            minLength: {
              value: 9,
              message: 'Le siren doit contenir 9 caractères',
            },
          })}
          type="number"
          id="phone"
          maxLength={9}
          minLength={9}
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
            maxLength: {
              value: 14,
              message: 'Le siren doit contenir 14 caractères',
            },
            minLength: {
              value: 14,
              message: 'Le siren doit contenir 14 caractères',
            },
          })}
          type="text"
          id="siret"
          maxLength={14}
          minLength={14}
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
            maxLength: {
              value: 50,
              message: "L'adresse ne doit pas dépasser 50 caractères",
            },
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
            maxLength: {
              value: 20,
              message: 'La ville ne doit pas dépasser 20 caractères',
            },
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
            maxLength: {
              value: 5,
              message: 'Le code postal doit contenir 5 caractères',
            },
            minLength: {
              value: 5,
              message: 'Le code postal doit contenir 5 caractères',
            },
          })}
          type="number"
          id="zipCode"
          maxLength={5}
          minLength={5}
          max={99999}
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
  const loadUser = async (): Promise<IUser> => {
    const userUuid = localStorage.getItem('userUuid');
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const user = fetch(`/api/user/${userUuid}`, options)
      .then((response) => response.json())
      .catch((error) => console.error(error));
    return user;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IShopUpdatePayload>({ mode: 'onChange' });
  const [shop, setShop] = React.useState<IShopUpdatePayload>();

  useEffect(() => {
    const getShop = async (): Promise<void> => {
      const user = await loadUser();
      try {
        const response = await fetch(`/api/shop/${user?.shop.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json(); // Extract JSON data from response
        setShop(data);
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
  }, []);

  const onSubmit: SubmitHandler<IShopUpdatePayload> = useCallback(
    async (data) => {
      const toastid = toast.loading('updating shop...');
      const res = await fetch(`/api/shop/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (res.status >= 400) {
        // read the response body
        const body = await res.json();
        toast.update(toastid, {
          render: `Shop not updated: ${body.message}`,
          type: 'error',
          autoClose: 2000,
          isLoading: false,
        });
      } else {
        toast.update(toastid, {
          render: 'Shop updated',
          type: 'success',
          autoClose: 2000,
          isLoading: false,
        });
        router.push('/');
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="">
        <Label htmlFor="companyName" className="">
          Nom du shop
        </Label>
        <TextInput
          {...register('companyName', {
            required: 'Le nom du shop est requis',
            maxLength: {
              value: 50,
              message: 'Le nom du shop ne doit pas dépasser 50 caractères',
            },
          })}
          type="text"
          id="companyName"
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
            maxLength: {
              value: 50,
              message: "L'email ne doit pas dépasser 50 caractères",
            },
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
            maxLength: {
              value: 10,
              message: 'Le numéro de téléphone doit contenir 10 caractères',
            },
          })}
          type="number"
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
            maxLength: {
              value: 9,
              message: 'Le siren doit contenir 9 caractères',
            },
            minLength: {
              value: 9,
              message: 'Le siren doit contenir 9 caractères',
            },
          })}
          type="text"
          id="siren"
          maxLength={9}
          minLength={9}
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
            maxLength: {
              value: 14,
              message: 'Le siren doit contenir 14 caractères',
            },
            minLength: {
              value: 14,
              message: 'Le siren doit contenir 14 caractères',
            },
          })}
          type="text"
          id="siret"
          maxLength={14}
          minLength={14}
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
            maxLength: {
              value: 50,
              message: "L'adresse ne doit pas dépasser 50 caractères",
            },
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
            maxLength: {
              value: 20,
              message: 'La ville ne doit pas dépasser 20 caractères',
            },
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
            maxLength: {
              value: 5,
              message: 'Le code postal doit contenir 5 caractères',
            },
            minLength: {
              value: 5,
              message: 'Le code postal doit contenir 5 caractères',
            },
          })}
          type="number"
          id="zipCode"
          maxLength={5}
          minLength={5}
          max={99999}
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
        className="flex-1 text-gray-50 bg-fidgreen hover:bg-fidgreen/80"
      >
        Enregistrer
      </Button>
    </form>
  );
};
