import { ShopCreateForm } from '@/components/form/Shop.form';
import Image from 'next/image';

export default function Shops() {
  return (
    <section className="bg-fidbg p-4">
      <div className="flex flex-col items-center justify-center px-6 mx-auto gap-y-10 md:h-full lg:py-0">
        <Image src="/logo.svg" width={300} height={100} alt="logo" />
        <div className="w-full bg-white rounded-lg shadow md:mt-0  sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Renseigner son commerce
            </h1>
            <ShopCreateForm />
          </div>
        </div>
      </div>
    </section>
  );
}

Shops.getLayout = (page) => <div className="">{page}</div>;
