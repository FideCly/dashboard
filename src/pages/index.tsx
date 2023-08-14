import Navbar from '@/Components/html/Navbar';
import Sidebar from '@/Components/html/Sidebar';
import { BarChart } from '@/Components/statistics/chart';
import {
  IAffluence,
  IClientCount,
  IPromotionRanking,
} from '@/Models/Analytics';
import { IUser } from '@/Models/User';
import { faCircleCheck, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
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
    <main className="flex flex-col">
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <div className="min-w-0 overflow-hidden bg-white rounded-lg shadow-xs ">
          <div className="flex items-center p-4">
            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
              <FontAwesomeIcon icon={faUserGroup} className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Total clients
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {clientCount ? clientCount.value : 77}
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 overflow-hidden bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div className="flex items-center p-4">
            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
              <FontAwesomeIcon icon={faCircleCheck} className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Passage sur ce mois
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                {affluence ? affluence.value : 50}
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 overflow-hidden bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div className="flex items-center p-4">
            <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
              <FontAwesomeIcon icon={faUserGroup} className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Nombre de validation aujourd'hui
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                234
              </p>
            </div>
          </div>
        </div>
        <div className="min-w-0 overflow-hidden bg-white rounded-lg shadow-xs dark:bg-gray-800">
          <div className="flex items-center p-4">
            <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
              <FontAwesomeIcon icon={faUserGroup} className="w-5 h-5" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending contacts
              </p>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                35
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-5 py-5 text-gray-500 bg-white rounded shadow-xl">
        <h3 className="text-lg font-semibold leading-tight">
          Classement Promotion
        </h3>
        <div className="">
          <div className="">
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
      </div>
    </main>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <div className="relative flex bg-gray-50">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <main className="h-screen py-10 ">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">{page}</div>
        </main>
      </div>
    </div>
  );
};
