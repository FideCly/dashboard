import { IPromotions } from '@/Models/Promotions';
import Sidebar from '@/Components/html/Sidebar';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps<{
  promotion: IPromotions;
}> = async (context) => {
  const id = context.params?.id;
  const promotion = await fetch(`/api/promotion/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (res) => {
    if (res.status >= 400) {
      throw new Error('Bad response from server');
    }
    return await res.json();
  });
  return {
    props: {
      promotion,
    },
  };
};

export default function PromotionViewById({
  promotion,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>{promotion?.name}</h1>
      <p>{promotion?.description}</p>
      <p>{promotion?.startAt?.toDateString()} </p>
      <p>{promotion?.endAt?.toDateString()}</p>
    </div>
  );
}

PromotionViewById.getLayout = (page) => (
  <div className="flex">
    <Sidebar />
    {page}
  </div>
);
