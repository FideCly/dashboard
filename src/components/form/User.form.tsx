import { IUser, IUserUpdatePayload } from '@/models/User';
import { Button, Label } from 'flowbite-react';
import React, { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import moment from 'moment';
import { errorCode } from '@/translation';

export const UserUpdateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<IUserUpdatePayload>({ mode: 'onChange' });

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

  useEffect(() => {
    const loadUserShop = async (): Promise<void> => {
      const user = await loadUser();
      setValue('id', user?.id);
      setValue('email', user?.email);
      setValue('username', user?.username);
      setValue('birthday', moment(user?.birthday).format('YYYY-MM-DD'));
      setValue('sexe', user?.sexe);
      setValue('pictureUrl', user?.pictureUrl ?? '');
    };

    loadUserShop();
  }, []);

  const onSubmit: SubmitHandler<IUserUpdatePayload> = useCallback(
    async (data) => {
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const toastId = toast.loading('Vérification en cours...');
      const response = await fetch(`/api/auth/${data.id}/update`, options);
      const body = await response.json();
      if (response.status >= 400) {
        toast.update(toastId, {
          render: `${
            errorCode[response.status][body.message] ||
            errorCode[response.status][body.error]
          }`,
          type: 'error',
          autoClose: 2000,
          isLoading: false,
        });
      } else {
        toast.update(toastId, {
          render: `${errorCode[response.status][body.message]}`,
          type: 'success',
          autoClose: 2000,
          isLoading: false,
        });
      }
    },
    [],
  );

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
            Photo (optionnel)
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

      <div className="flex flex-col">
        <Label htmlFor="username" className="text-sm font-medium">
          Email
        </Label>
        <input
          {...register('email')}
          type="text"
          name="email"
          id="email"
          disabled
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
        />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="username" className="text-sm font-medium">
          Nom d'utilisateur
        </Label>
        <input
          {...register('username', { required: true })}
          type="text"
          name="username"
          id="username"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
        />
        {errors.username && (
          <span className="text-sm text-red-500">Ce champ est requis</span>
        )}
      </div>
      <div className="flex flex-col">
        <Label htmlFor="birthday" className="text-sm font-medium">
          Date de naissance
        </Label>
        <input
          {...register('birthday', { required: true })}
          type="date"
          name="birthday"
          id="birthday"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
        />
        {errors.birthday && (
          <span className="text-sm text-red-500">Ce champ est requis</span>
        )}
      </div>
      <div className="flex flex-col">
        <Label htmlFor="sexe" className="text-sm font-medium">
          Sexe
        </Label>
        <select
          name="sexe"
          id="sexe"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
          {...register('sexe', { required: true })}
        >
          <option value="Male" selected>
            Homme
          </option>
          <option value="Female">Femme</option>
        </select>
        {errors.sexe && (
          <span className="text-sm text-red-500">Ce champ est requis</span>
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
