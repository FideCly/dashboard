import { ShopCreateForm } from '@/Components/form/Shop.form';
import Image from 'next/image';

export default function Shops() {
  return (
    <section className="bg-fidbg ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <Image
            src="/logo.png"
            width={60}
            height={40}
            className="rounded"
            alt="logo"
          />
          Fidecly
        </a>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Crée une boutique
            </h1>
            <ShopCreateForm />
          </div>
        </div>
      </div>
    </section>
  );
}

Shops.getLayout = (page) => <div className="">{page}</div>;
