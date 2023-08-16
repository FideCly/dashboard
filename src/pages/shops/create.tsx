import { ShopCreateForm } from '@/components/form/Shop.form';
import Image from 'next/image';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Shops() {
  const router = useRouter();

  return (
    <section className="z-10 p-10 w-full">
      <button
        className="w-full mx-auto flex justify-end items-center gap-2 font-medium hover:text-fidgreen"
        onClick={() => {
          // delete user id from localstorage
          localStorage.removeItem('userUuid');
          // delete cookie
          deleteCookie('token');
          // return to signin page
          router.push('/auth/signin');
        }}
        id="logout"
      >
        <span>Déconnexion</span>
        <FontAwesomeIcon icon={faRightToBracket} />
      </button>

      <div className="z-10 m-10 flex flex-col items-center justify-center px-6 mx-auto gap-10 md:h-full w-full lg:py-0">
        <Image src="/logo.svg" width={300} height={100} alt="logo" />
        <div className="z-10 bg-white rounded-lg shadow md:mt-0 xl:p-0 ">
          <div className="p-4 m-4 flex flex-col flex-auto gap-8">
            <div>
              <h1 className="text-xl font-semibold leading-6 text-gray-900">
                Renseigner son commerce
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Votre profil n’est pas encore lié à un commerce. Complétez le
                formulaire ci-dessous en renseignant les informations de votre
                boutique.
              </p>
            </div>
            <ShopCreateForm />
          </div>
        </div>
      </div>
    </section>
  );
}

Shops.getLayout = function getLayout(page) {
  return (
    <div className="relative bg-fidbg h-full min-h-screen">
      <div className="z-10 w-full">{page}</div>
      <div className="z-1 absolute h-fit w-full bottom-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#5DB075"
            fill-opacity="1"
            d="M0,160L80,165.3C160,171,320,181,480,208C640,235,800,277,960,282.7C1120,288,1280,256,1360,240L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="z-2 absolute h-fit w-full bottom-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#224957"
            fill-opacity="0.8"
            d="M0,192L60,213.3C120,235,240,277,360,277.3C480,277,600,235,720,202.7C840,171,960,149,1080,160C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>{' '}
      </div>
    </div>
  );
};
