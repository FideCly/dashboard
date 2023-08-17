import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import CardsList from '@/components/list/CardsList';
import { BarChart } from '@/components/statistics/chart';
import {
  IAffluence,
  IClientCount,
  IPromotionRanking,
} from '@/models/Analytics';
import { IUser } from '@/models/User';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
Chart.register(CategoryScale);

function StatCard({ label, stat, total }) {
  let percentage = 0;
  if (total && total != 0 && stat != 0)
    percentage = Math.round((stat * 100) / total);

  return (
    <div className="px-4 py-5 sm:p-6 border-t">
      <dt className="text-base font-normal text-gray-900">{label}</dt>
      <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
        <div className="flex items-baseline text-2xl font-semibold text-fidyellow">
          {stat}
          {total != null && (
            <span className="ml-2 text-sm font-medium text-gray-500">
              sur {total}
            </span>
          )}
        </div>
        {total != null && (
          <div
            className={
              'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0 ' +
              (percentage > 0
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800')
            }
          >
            <svg
              className={
                '-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center ' +
                (percentage > 0 ? 'text-green-500' : 'text-gray-500')
              }
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="sr-only"> A augmenté de </span>
            {percentage}%
          </div>
        )}
      </dd>
    </div>
  );
}

export default function Home() {
  const yearStart = new Date(new Date().getFullYear(), 0, 1);
  const yearEnd = new Date(new Date().getFullYear(), 11, 31);
  const date = new Date();
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const dayStart = new Date();
  dayStart.setUTCHours(0, 0, 0, 0);
  const dayEnd = new Date();
  dayEnd.setHours(23, 59, 59, 999);

  const [, setUser] = useState<IUser>();
  const [affluence, setAffluence] = useState<IAffluence>();
  const [affluenceToday, setAffluenceToday] = useState<IAffluence>();
  const [affluenceThisMonth, setAffluenceThisMonth] = useState<IAffluence>();
  const [clientCount, setClientCount] = useState<IClientCount>();
  const [clientCountThisMonth, setClientCountThisMonth] =
    useState<IClientCount>();
  const [clientCountThisYear, setClientCountThisYear] =
    useState<IClientCount>();
  const [promotionRanking, setPromotionRanking] = useState<IPromotionRanking>();
  const router = useRouter();

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
    setUser(user);
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
            start_date: yearStart.toISOString().split('T')[0],
            end_date: yearEnd.toISOString().split('T')[0],
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
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAffluenceToday = async (): Promise<void> => {
    try {
      const response = await fetch(
        `/api/analytics/affluence?` +
          new URLSearchParams({
            start_date: dayStart.toISOString().split('T')[0],
            end_date: dayEnd.toISOString().split('T')[0],
          }),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json(); // Extract JSON data from response
      setAffluenceToday(data); // Set state with extracted data
    } catch (error) {
      console.log(error);
    }
  };

  const getAffluenceThisMonth = async (): Promise<void> => {
    try {
      const response = await fetch(
        `/api/analytics/affluence?` +
          new URLSearchParams({
            start_date: monthStart.toISOString().split('T')[0],
            end_date: monthEnd.toISOString().split('T')[0],
          }),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json(); // Extract JSON data from response
      setAffluenceThisMonth(data); // Set state with extracted data
    } catch (error) {
      console.log(error);
    }
  };

  const getPromotionRanking = async (): Promise<void> => {
    try {
      const response = await fetch(
        `/api/analytics/promotion-ranking?` +
          new URLSearchParams({
            start_date: yearStart.toISOString().split('T')[0],
            end_date: yearEnd.toISOString().split('T')[0],
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
            start_date: new Date(1970 - 1 - 1).toISOString().split('T')[0],
            end_date: new Date().toISOString().split('T')[0],
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

  const getClientCountThisMonth = async (): Promise<void> => {
    try {
      const response = await fetch(
        `/api/analytics/client-count?` +
          new URLSearchParams({
            start_date: monthStart.toISOString().split('T')[0],
            end_date: monthEnd.toISOString().split('T')[0],
          }),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json(); // Extract JSON data from response
      setClientCountThisMonth(data); // Set state with extracted data
    } catch (error) {
      console.log(error);
    }
  };

  const getClientCountThisYear = async (): Promise<void> => {
    try {
      const response = await fetch(
        `/api/analytics/client-count?` +
          new URLSearchParams({
            start_date: yearStart.toISOString().split('T')[0],
            end_date: yearEnd.toISOString().split('T')[0],
          }),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json(); // Extract JSON data from response
      setClientCountThisYear(data); // Set state with extracted data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkShop();
    getClientCount();
    getClientCountThisMonth();
    getClientCountThisYear();
    getPromotionRanking();
    getAffluence();
    getAffluenceThisMonth();
    getAffluenceToday();
  }, []);

  return (
    <main className="flex flex-col min-h-screen">
      <div className="border-b p-12">
        <h1 className="text-xl font-semibold leading-6 text-gray-900">
          Données analytiques
        </h1>
        <p className="mt-2 text-sm text-gray-700">
          Statistiques et tendances de votre boutique.
        </p>
      </div>
      <header className="border-b border-white/5 bg-gray-50">
        <nav className="flex py-4 border-b px-12">
          <ul
            role="list"
            className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-800 sm:px-6 lg:px-8"
          >
            <li>
              <a href="#stats" className="hover:text-fidgreen">
                Chiffres clés
              </a>
            </li>
            <li>
              <a href="#charts" className="hover:text-fidgreen">
                Graphes
              </a>
            </li>
            <li>
              <a href="#activity" className="hover:text-fidgreen">
                Activité Récente
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div
        id="stats"
        className="my-16 grid border-b md:grid-cols-2 xl:grid-cols-3 divide-x bg-gray-50"
      >
        {/* Affluence today */}
        <StatCard
          label="Nombre De Fréquentations Aujourd'hui"
          stat={affluenceToday ? affluenceToday.value : 0}
          total={affluence ? affluence.value : 0}
        />
        {/* Affluence this month */}
        <StatCard
          label="Nombre De Fréquentations Sur Ce Mois"
          stat={affluenceThisMonth ? affluenceThisMonth.value : 0}
          total={affluence ? affluence.value : 0}
        />
        {/* Affluence this year */}
        <StatCard
          label="Nombre De Fréquentations Sur Cette Année"
          stat={affluence ? affluence.value : 0}
          total={null}
        />
        {/* Clients count */}
        <StatCard
          label="Nombre Total De Clients"
          stat={clientCount ? clientCount.value : 0}
          total={null}
        />

        {/* Clients count this month */}
        <StatCard
          label="Nouveaux Clients Ce Mois"
          stat={clientCountThisMonth ? clientCountThisMonth.value : 0}
          total={clientCount ? clientCount.value : 0}
        />
        {/* Clients count this year */}
        <StatCard
          label="Nouveaux Clients Cette Année"
          stat={clientCountThisYear ? clientCountThisYear.value : 0}
          total={clientCount ? clientCount.value : 0}
        />
      </div>
      <div id="charts">
        {promotionRanking ? (
          <div className="w-2/3 p-8 justify-center mx-auto text-gray-600 ">
            <h3 className="text-lg font-normal text-gray-900">
              Classement Des Promotions Par Popularité
            </h3>
            <div className="">
              <div className="">
                <BarChart
                  chartData={{
                    labels: promotionRanking.promotionNames,
                    datasets: [
                      {
                        label: 'Nombre de fréquentations',
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
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div id="activity" className="p-8">
        <CardsList />
      </div>
    </main>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    <div className="w-full bg-fidbg flex">
      <div className=" inset-y-0 z-50 bg-fidgreen">
        <Sidebar />
      </div>
      <div className="w-full">
        <Navbar />
        <main className="">
          <div className="mx-auto">{page}</div>
        </main>
      </div>
    </div>
  );
};
