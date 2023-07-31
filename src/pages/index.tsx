import Navbare from '@/Components/html/Navbar';
import Sidebar from '@/Components/html/Sidebar';
import { BarChart } from '@/Components/statistics/chart';
import {
  IAffluence,
  IClientCount,
  IPromotionRanking,
} from '@/Models/Analytics';
import { IUser } from '@/Models/User';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Select } from 'flowbite-react';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
Chart.register(CategoryScale);

export default function Home() {
  const date = new Date();
  const startDate =
    date.getFullYear() +
    '-' +
    (date.getMonth().toString().length != 2
      ? '0' + date.getMonth()
      : date.getMonth()) +
    '-01';
  const endDate =
    date.getFullYear() +
    '-' +
    ((date.getMonth() + 1).toString().length != 2
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    '-31';

  const [affluence, setAffluence] = useState<IAffluence>();
  const [clientCount, setClientCount] = useState<IClientCount>();
  const [promotionRanking, setPromotionRanking] = useState<IPromotionRanking>();
  const router = useRouter();
  useEffect(() => {
    const loadUser = async (): Promise<IUser> => {
      const userUuid = localStorage.getItem('userUuid');
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(`/api/user/${userUuid}`, options);
      const user: IUser = await response.json();
      return user;
    };
    const checkShop = async (): Promise<void> => {
      const user = await loadUser();
      // if user not have shop got to create shop page
      if (!user?.shop) {
        router.push('/shops/create');
      }
    };
    const getAffluence = async (): Promise<void> => {
      try {
        const response = await fetch(
          `/api/analytics/affluence?` +
            new URLSearchParams({
              start_date: startDate,
              end_date: endDate,
            }),
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json(); // Extract JSON data from response
        setAffluence(data); // Set state with extracted data
      } catch (error) {
        console.log(error);
      }
    };
    const getPromotionRanking = async (): Promise<void> => {
      try {
        const response = await fetch(
          `/api/analytics/promotion-ranking?` +
            new URLSearchParams({
              start_date: startDate,
              end_date: endDate,
            }),
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json(); // Extract JSON data from response
        setPromotionRanking(data); // Set state with extracted data
      } catch (error) {
        console.log(error);
      }
    };
    const getClientCount = async (): Promise<void> => {
      try {
        const response = await fetch(
          `/api/analytics/client-count?` +
            new URLSearchParams({
              start_date: startDate,
              end_date: endDate,
            }),
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json(); // Extract JSON data from response
        setClientCount(data); // Set state with extracted data
      } catch (error) {
        console.log(error);
      }
    };
    checkShop();
    getClientCount();
    getPromotionRanking();
    getAffluence();
  }, []);

  return (
    <main className="bg-white rounded ronded-md text-stone-950">
      <div className="flex flex-col flex-1">
        <h1 className="flex-1 text-2xl">Global Statistiques</h1>
        <p>
          nombre d'affluence: {affluence ? affluence.value : 50} passage sur ce
          mois
        </p>
        <p>
          nombre de client:
          {clientCount ? clientCount.value : 77} client possedant une carte
        </p>
      </div>
      <div className="flex flex-1">
        <div className="flex flex-col content-center justify-center flex-1 p-4 text-center">
          <div className="flex">
            <h1 className="flex-1 ">stat</h1>
            <Select>
              <option value="1">année en cours</option>
              <option value="2">mois en cours</option>
              <option value="3">7 dernier jour</option>
              <option value="4">jour de la veille</option>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center flex-1 p-4 text-center bg-white rounded rounded-md">
        <div className="flex">
          <h1 className="flex-1 text-stone-950">
            Nombre de passage de carte par heure de la journée
          </h1>
          <Select>
            <option value="1">année en cours</option>
            <option value="2">mois en cours</option>
            <option value="3">7 dernier jour</option>
            <option value="4">jour de la veille</option>
            <option value="4">jour de la veille</option>
          </Select>
        </div>
        <div>
          {promotionRanking ? (
            <BarChart
              chartData={{
                labels: promotionRanking.promotionNames,
                datasets: [
                  {
                    label: 'Sales for 2020 (M)',
                    data: promotionRanking.values,
                    borderColor: ['rgba(0,0,0,1)'],
                    backgroundColor: [
                      '#55dde0',
                      '#33658A',
                      '#2F4858',
                      '#F6AE2D',
                      '#F26419',
                      '#14BDEB',
                      '#949D6A',
                    ],
                    borderWidth: 4,
                  },
                ],
              }}
            />
          ) : null}
        </div>
      </div>
    </main>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <div className="">
      <Sidebar />
      <div className="p-2 sm:ml-64">
        <Navbare />
        {page}
      </div>
    </div>
  );
};
