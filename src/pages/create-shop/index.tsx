import { ShopCreateForm } from '@/Components/form/Shop.form';

export default function Shops() {
  return (
    <>
      <h1>Crée une boutique</h1>
      <ShopCreateForm />
    </>
  );
}

Shops.getLayout = (page) => <div className="">{page}</div>;
