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
    const toastid = toast.loading('connecting user...');
    const response = await fetch(`/api/auth/signin`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.status >= 400) {
      // read the response body
      const body = await response.json();
      toast.update(toastid, {
        render: body.message,
        type: 'error',
        autoClose: 2000,
        isLoading: false,
      });
    } else {
      const user: jwttoken = await response.json();
      localStorage.setItem('userUuid', user.userUuid);
      // create a cookie
      setCookie('token', user.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      toast.update(toastid, {
        render: 'user connected',
        type: 'success',
        autoClose: 2000,
        isLoading: false,
      });
      // if user is has a shop, redirect home
      const userShop = await loadUser();
      if (userShop.shop) {
        router.push('/');
      } else {
        router.push('/shops/create');
      }
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
                {...register('email', {
                  required: "L'email est requis",
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Ce champ doit contenir un email valide',
                  },
                })}
                name="email"
                type="email"
                placeholder="hello@fidelcly.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
              />
              {errors.email && (
                <span className="text-sm text-red-600">
                  {errors.email.message.toString()}
                </span>
              )}

              <Label>Mot de passe</Label>
              <input
                {...register('password', {
                  required: 'Le mot de passe est requis',
                  minLength: {
                    value: 8,
                    message:
                      'Le mot de passe doit contenir minimum 8 caractères',
                  },
                })}
                name="password"
                type="password"
                placeholder="********"
                minLength={8}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
              />
              {errors.password && (
                <span className="text-sm text-red-600">
                  {errors.password.message.toString()}
                </span>
              )}

              <button
                type="submit"
                className="w-full p-2 m-auto font-medium rounded-lg text-gray-50 bg-fidgreen hover:bg-fidgreen/80"
              >
                Se connecter
              </button>

              <p className="text-sm font-light text-right text-gray-500">
                Pas encore inscrit ?{' '}
                <Link
                  href="/auth/signup"
                  className="font-medium text-gray-600 hover:text-fidgreen hover:underline"
                >
                  S'inscrire
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
