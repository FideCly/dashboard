import { IAuthPayload, IUser, IUserAuthPayload, jwttoken } from '@/Models/User';
import { setCookie } from 'cookies-next';
import { Label } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function SignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserAuthPayload>({ mode: 'onChange' });

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

  const onSubmit: SubmitHandler<IAuthPayload> = useCallback(async (data) => {
    try {
      const response = await fetch(`/api/auth/signin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status >= 400) {
        const res = await response.json();
        throw new Error(res);
      } else {
        const user: jwttoken = await response.json();
        localStorage.setItem('userUuid', user.userUuid);
        // create a cookie
        setCookie('token', user.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });
        toast('user connected', {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'success',
        });
        // if user is has a shop, redirect home
        const userShop = await loadUser();
        if (userShop.shop) {
          router.push('/');
        } else {
          router.push('/shops/create');
        }
      }
    } catch (error) {
      toast('user not connected', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
      });
      console.error(error);
    }
  }, []);

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 mx-auto gap-y-10 md:h-screen lg:py-0">
        <Image src="/logo.svg" width={400} height={100} alt="logo" />
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
              Se connecter
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <Label>Email</Label>
              <input
                {...register('email', { required: "L'email est requis" })}
                name="email"
                type="email"
                placeholder="hello@fidelcly.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
              />
              {errors.email && (
                <span className="text-red-600 text-sm">
                  {errors.email.message.toString()}
                </span>
              )}

              <Label>Mot de passe</Label>
              <input
                {...register('password', {
                  required: 'Le mot de passe est requis',
                  minLength: 8,
                })}
                name="password"
                type="password"
                placeholder="********"
                minLength={8}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
              />
              {errors.password && (
                <span className="text-red-600 text-sm">
                  {errors.password.message.toString()}
                </span>
              )}

              <button
                type="submit"
                className="p-2 w-full m-auto text-gray-50 font-medium rounded-lg bg-fidgreen hover:bg-fidgreen/80"
              >
                Se connecter
              </button>

              <p className="text-sm font-light text-gray-500 text-right">
                Pas encore inscrit ?{' '}
                <Link
                  href="/auth/signup"
                  className="font-medium text-gray-600 hover:text-fidgreen hover:underline"
                >
                  S'inscire
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
