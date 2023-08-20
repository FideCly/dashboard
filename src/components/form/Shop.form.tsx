import React, { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IShopCreatePayload, IShopUpdatePayload } from '@/models/Shop';
import { Button, Label } from 'flowbite-react';
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-google-places-autocomplete';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { IUser } from '@/models/User';
import { errorCode } from '@/translation';

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
      const toastid = toast.loading('Vérification en cours...');
      const response = await fetch(`/api/shop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      // read the response body
      const body = await response.json();
      if (response.status >= 400) {
        toast.update(toastid, {
          render: `${
            errorCode[response.status][body.message] ||
            errorCode[response.status][body.error]
          }`,
          type: 'error',
          autoClose: 3000,
          isLoading: false,
        });
      } else {
        toast.update(toastid, {
          render: `${errorCode[response.status]['Shop created']}`,
          type: 'success',
          autoClose: 3000,
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white flex flex-col z-10 w-full gap-4"
    >
      <div className="z-10 grid grid-cols-2 gap-6">
        <div className="z-10">
          <Label htmlFor="companyName" className="">
            Nom du shop
          </Label>
          <input
            {...register('companyName', {
              required: 'Le nom du shop est requis',
            })}
            type="text"
            id="companyName"
            placeholder="Nom du shop"
            className="bg-fidbg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
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
          <select
            {...register('activity', {
              required: "L'activité du shop est requise",
            })}
            className="bg-fidbg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
          >
            <option value="Restauration" selected>
              Restauration
            </option>
            <option value="Supply">Alimentation</option>
            <option value="Entertainment">Divertissement</option>
            <option value="Store">Magasin</option>
            <option value="Service">Service</option>
          </select>
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
          <input
            {...register('email', {
              required: "L'email est requis",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Ce champ doit contenir un email valide',
              },
            })}
            type="text"
            id="email"
            placeholder="hello@fidelcly.com"
            className="bg-fidbg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
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
          <input
            {...register('phone', {
              required: 'Le numéro de téléphone est requis',
              pattern: {
                value: /^\d*$/,
                message: 'Le numéro de téléphone doit être un nombre',
              },
              maxLength: {
                value: 10,
                message: 'Le numéro de téléphone doit contenir 10 chiffres',
              },
              minLength: {
                value: 10,
                message: 'Le numéro de téléphone doit contenir 10 chiffres',
              },
            })}
            type="text"
            id="phone"
            maxLength={10}
            placeholder="0XXXXXXXXX"
            className="bg-fidbg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
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
          <input
            {...register('siren', {
              required: 'Le siren est requis',
              pattern: {
                value: /^\d*$/,
                message: 'Le siren doit être un nombre',
              },
              minLength: {
                value: 9,
                message: 'Le siren doit contenir 9 chiffres',
              },
              maxLength: {
                value: 9,
                message: 'Le siren doit contenir 9 chiffres',
              },
            })}
            type="text"
            id="siren"
            maxLength={9}
            minLength={9}
            placeholder="XXXXXXXXX"
            className="bg-fidbg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
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
          <input
            {...register('siret', {
              required: 'Le siret est requis',
              maxLength: {
                value: 14,
                message: 'Le siret doit contenir 14 caractères',
              },
              minLength: {
                value: 14,
                message: 'Le siret doit contenir 14 caractères',
              },
            })}
            type="text"
            id="siret"
            maxLength={14}
            minLength={14}
            placeholder="XXXXXXXXXXXXXX"
            className="bg-fidbg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
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
          <input
            {...register('city', {
              required: 'La ville est requise',
            })}
            type="text"
            id="city"
            placeholder="Paris"
            className="bg-fidbg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
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
          <input
            {...register('zipCode', {
              required: 'Le code postal est requis',
              pattern: {
                value: /^\d*$/,
                message: 'Le code postal doit être un nombre',
              },
              maxLength: {
                value: 5,
                message: 'Le code postal doit contenir 5 chiffres',
              },
              minLength: {
                value: 5,
                message: 'Le code postal doit contenir 5 chiffres',
              },
            })}
            type="text"
            id="zipCode"
            maxLength={5}
            minLength={5}
            max={99999}
            placeholder="XXXXX"
            className="bg-fidbg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
          />
          {errors.zipCode && (
            <span className="text-sm text-red-600">
              {errors.zipCode.message.toString()}
            </span>
          )}
        </div>
        <div className="">
          <Label htmlFor="zipCode" className="">
            Logo (optionnel)
          </Label>
          <input
            {...register('pictureUrl')}
            type="text"
            id="pictureUrl"
            placeholder="https://example.com/picture"
            className="bg-fidbg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
          />
        </div>
      </div>
      <Button
        type="submit"
        className="z-10 text-gray-50 bg-fidgreen hover:bg-fidgreen/80"
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
    getValues,
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
        setValue('pictureUrl', data.pictureUrl || '');
        setValue('description', data.description || '');
        setValue('activity', data.activity);
      } catch (error) {
        console.log(error);
      }
    };
    getShop();
  }, []);

  const onSubmit: SubmitHandler<IShopUpdatePayload> = useCallback(
    async (data) => {
      const toastid = toast.loading('Vérification en cours...');
      const response = await fetch(`/api/shop/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      // read the response body
      const body = await response.json();
      if (response.status >= 400) {
        toast.update(toastid, {
          render: `${
            errorCode[response.status][body.message] ||
            errorCode[response.status][body.error]
          }`,
          type: 'error',
          autoClose: 3000,
          isLoading: false,
        });
      } else {
        toast.update(toastid, {
          render: `${
            errorCode[response.status][body.message] ||
            errorCode[response.status][response.statusText]
          }`,
          type: 'success',
          autoClose: 3000,
          isLoading: false,
        });
        router.reload();
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:col-span-2 gap-y-4"
    >
      <div className="col-span-full flex items-center gap-x-8">
        {getValues('pictureUrl') && (
          <img
            src={getValues('pictureUrl')}
            alt=""
            className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
          />
        )}
        <div className="w-full">
          <Label htmlFor="zipCode" className="">
            Logo (optionnel)
          </Label>
          <input
            {...register('pictureUrl')}
            type="text"
            id="pictureUrl"
            placeholder="https://example.com/picture"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
          />
        </div>
      </div>

      <div className="">
        <Label htmlFor="companyName" className="">
          Nom du shop
        </Label>
        <input
          {...register('companyName', {
            required: 'Le nom du shop est requis',
          })}
          type="text"
          id="companyName"
          placeholder="Nom du shop"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
        />
        {errors.companyName && (
          <span className="text-sm text-red-600">
            {errors.companyName.message.toString()}
          </span>
        )}
      </div>

      <div className="">
        <Label htmlFor="description" className="">
          Description (optionnel)
        </Label>
        <input
          {...register('description')}
          type="text"
          id="description"
          placeholder="Description"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
        />
      </div>

      <div className="">
        <Label htmlFor="activity" className="">
          Activité du shop
        </Label>
        <select
          {...register('activity', {
            required: "L'activité du shop est requise",
          })}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
        >
          <option
            value="Restauration"
            selected={shop?.activity === getValues('activity') ?? false}
          >
            Restauration
          </option>
          <option
            value="Supply"
            selected={shop?.activity === getValues('activity') ?? false}
          >
            Alimentation
          </option>
          <option
            value="Entertainment"
            selected={shop?.activity === getValues('activity') ?? false}
          >
            Divertissement
          </option>
          <option
            value="Store"
            selected={shop?.activity === getValues('activity') ?? false}
          >
            Magasin
          </option>
          <option
            value="Service"
            selected={shop?.activity === getValues('activity') ?? false}
          >
            Service
          </option>
        </select>
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
        <input
          {...register('email', {
            required: "L'email est requis",
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Ce champ doit contenir un email valide',
            },
          })}
          type="text"
          id="email"
          placeholder="hello@fidelcly.com"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
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
        <input
          {...register('phone', {
            required: 'Le numéro de téléphone est requis',
            pattern: {
              value: /^\d*$/,
              message: 'Le numéro de téléphone doit être un nombre',
            },
            maxLength: {
              value: 10,
              message: 'Le numéro de téléphone doit contenir 10 chiffres',
            },
            minLength: {
              value: 10,
              message: 'Le numéro de téléphone doit contenir 10 chiffres',
            },
          })}
          type="text"
          id="phone"
          maxLength={10}
          placeholder="0XXXXXXXXX"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
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
        <input
          {...register('siren', {
            required: 'Le siren est requis',
            pattern: {
              value: /^\d*$/,
              message: 'Le siren doit être un nombre',
            },
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
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
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
        <input
          {...register('siret', {
            required: 'Le siret est requis',
            maxLength: {
              value: 14,
              message: 'Le siret doit contenir 14 caractères',
            },
            minLength: {
              value: 14,
              message: 'Le siret doit contenir 14 caractères',
            },
          })}
          type="text"
          id="siret"
          maxLength={14}
          minLength={14}
          placeholder="XXXXXXXXXXXXXX"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
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
        <input
          {...register('city', {
            required: 'La ville est requise',
          })}
          type="text"
          id="city"
          placeholder="Paris"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
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
        <input
          {...register('zipCode', {
            required: 'Le code postal est requis',
            pattern: {
              value: /^\d*$/,
              message: 'Le code postal doit être un nombre',
            },
            maxLength: {
              value: 5,
              message: 'Le code postal doit contenir 5 chiffres',
            },
            minLength: {
              value: 5,
              message: 'Le code postal doit contenir 5 chiffres',
            },
          })}
          type="text"
          id="zipCode"
          maxLength={5}
          minLength={5}
          max={99999}
          placeholder="XXXXX"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
        />
        {errors.zipCode && (
          <span className="text-sm text-red-600">
            {errors.zipCode.message.toString()}
          </span>
        )}
      </div>

      <Button
        type="submit"
        className="w-1/2 px-3 mx-auto text-sm font-medium text-center text-white rounded-md shadow-sm bg-fidgreen hover:bg-fidgreen/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fidgreen"
      >
        Enregistrer
      </Button>
    </form>
  );
};
