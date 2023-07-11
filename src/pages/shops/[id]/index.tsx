import { IShop } from '@/Models/Shop';
import Sidebar from '@/Components/html/Sidebar';
import Navbare from '@/Components/html/Navbar';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const GetServerSideProps: GetServerSideProps<{
  shop: IShop;
}> = async (context) => {
  const id = context.params?.id;
  const res = await fetch(`http://localhost:3000/api/shop/${id}`);
  const shop = await res.json();
  return {
    props: {
      shop,
    },
  };
};

export default function ShopViewById({
  shop,
}: InferGetServerSidePropsType<typeof GetServerSideProps>) {
  return (
    <div>
      <h1>{shop?.companyName}</h1>
      <p>{shop?.address}</p>
      <p>{shop?.zipCode}</p>
      <p>{shop?.phone}</p>
      <p>{shop?.email}</p>
      <p>{shop?.siren}</p>
      <p>{shop?.siret}</p>
    </div>
  );
}

ShopViewById.getLayout = (page) => (
  <div className="">
    <Sidebar />
    <div className="p-4 sm:ml-64">
      <Navbare />
      {page}
    </div>
  </div>
);
