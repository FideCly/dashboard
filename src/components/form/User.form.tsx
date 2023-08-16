import { IUser, IUserUpdatePayload } from '@/models/User';
import { Button, Label } from 'flowbite-react';
import React, { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import moment from 'moment';

export const UserUpdateForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
      const toastId = toast.loading('updating user...');
      const response = await fetch(`/api/auth/${data.id}/update`, options);
      const body = await response.json();
      if (response.status >= 400) {
        toast.update(toastId, {
          render: `error updating user: ${body.message}`,
          type: 'error',
          autoClose: 2000,
          isLoading: false,
        });
      } else {
        toast.update(toastId, {
          render: `user updated: ${body.message}`,
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
      <div className="flex flex-col">
        <Label htmlFor="username" className="text-sm font-medium">
          Email
        </Label>
        <input
          type="text"
          name="email"
          id="email"
          disabled
          className="p-2 border bg-gray-100 border-gray-300 rounded-md"
          {...register('email')}
        />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="username" className="text-sm font-medium">
          Nom d'utilisateur
        </Label>
        <input
          type="text"
          name="username"
          id="username"
          className="p-2 border border-gray-300 rounded-md"
          {...register('username', { required: true })}
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
          type="date"
          name="birthday"
          id="birthday"
          className="p-2 border border-gray-300 rounded-md"
          {...register('birthday', { required: true })}
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
          className="p-2 border border-gray-300 rounded-md"
          {...register('sexe', { required: true })}
        >
          <option value="Male">Homme</option>
          <option value="Female">Femme</option>
        </select>
        {errors.sexe && (
          <span className="text-sm text-red-500">Ce champ est requis</span>
        )}
      </div>
      <Button
        type="submit"
        className="flex-1 text-gray-50 bg-fidgreen hover:bg-fidgreen/80"
      >
        Modifier
      </Button>
    </form>
  );
};
