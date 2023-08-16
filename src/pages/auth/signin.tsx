import { IAuthPayload, IUser, IUserAuthPayload } from '@/models/User';
import { errorCode } from '@/translation';
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
    const toastid = toast.loading('Vérification en cours...');
    const response = await fetch(`/api/auth/signin`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const body = await response.json();
    if (response.status >= 400) {
      // read the response body
      toast.update(toastid, {
        render: `${errorCode[response.status][body.message]}`,
        type: 'error',
        autoClose: 3000,
        isLoading: false,
      });
    } else {
      localStorage.setItem('userUuid', body.userUuid);
      // create a cookie
      setCookie('token', body.token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
      toast.update(toastid, {
        render: `Connexion réussie`,
        type: 'success',
        autoClose: 3000,
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
    <section className="bg-fidbg ">
      <div className="z-20 flex flex-col items-center justify-center px-6 mx-auto gap-y-10 md:h-screen lg:py-0">
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
                className="bg-fidbg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
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
                className="bg-fidbg border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-fidgreen focus:border-fidgreen block w-full p-2.5"
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
      <div className="sticky bottom-0 z-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#5DB075"
            fill-opacity="1"
            d="M0,160L80,165.3C160,171,320,181,480,208C640,235,800,277,960,282.7C1120,288,1280,256,1360,240L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="sticky bottom-0 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#224957"
            fill-opacity="0.8"
            d="M0,256L80,245.3C160,235,320,213,480,202.7C640,192,800,192,960,208C1120,224,1280,256,1360,272L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
