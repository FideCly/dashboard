import Navbare from '@/Components/html/Navbar';
import Sidebar from '@/Components/html/Sidebar';
import { BarChart, LineChart, PieChart } from '@/Components/statistics/chart';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Select } from 'flowbite-react';
import { useEffect, useState } from 'react';
Chart.register(CategoryScale);

export default function Home() {
  const startDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  ).toISOString();
  const endDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0,
  ).toISOString();
  const date = new URLSearchParams();
  date.append('startDate', startDate);
  date.append('endDate', endDate);

  const [affluence, setAffluence] = useState();
  const [promotionCheckoutCount, setPromotionCheckoutCount] = useState();
  useEffect(() => {
    const getAffluence = async (): Promise<void> => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/analytics/affluence/`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            body: date,
          },
        );
        const data = await response.json(); // Extract JSON data from response
        setAffluence(data); // Set state with extracted data
      } catch (error) {
        console.log(error);
      }
    };
    const getPromotionCheckoutCount = async (): Promise<void> => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/analytics/promotion-checkout-count/`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            body: date,
          },
        );
        const data = await response.json(); // Extract JSON data from response
        setPromotionCheckoutCount(data ? data : 50); // Set state with extracted data
      } catch (error) {
        console.log(error);
      }
    };
    void getPromotionCheckoutCount();
    void getAffluence();
  }, []);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales for 2020 (M)',
        data: [0, 0, 0, 4, 2, 6, 7],
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
  };

  const data2 = {
    labels: [
      '6AM',
      '7AM',
      '8AM',
      '9AM',
      '10AM',
      '11AM',
      '12AM',
      '1PM',
      '2PM',
      '3PM',
      '4PM',
      '5PM',
    ],
    datasets: [
      {
        label: 'Nombre de passage de carte par heure de la journée',
        data: [0, 2, 0, 1, 5, 0, 0, 3, 0, 2, 1, 0, 6, 0],
        borderColor: ['rgba(255,206,86,0.2)'],
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
  };

  const data3 = {
    labels: ['tres loyal', 'loyal', 'moyen', 'peu loyal', 'pas loyal'],

    datasets: [
      {
        label: 'pourcentage de fidelité',
        data: [30, 20, 20, 10, 20],
        borderColor: ['rgba(255,206,86,0.2)'],
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
  };

  return (
    <main className="bg-white rounded ronded-md text-stone-950">
      <div className="flex flex-col flex-1">
        <h1 className="flex-1 text-2xl">Global Statistiques</h1>
        <p>
          nombre d'affluence: {affluence ? affluence : 50} passage sur ce mois
        </p>
        <p>
          nombre de client:
          {promotionCheckoutCount ? promotionCheckoutCount : 77} client
          possedant une carte
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
          <div>
            <LineChart chartData={data} />
          </div>
        </div>
        <div className="flex flex-col content-center justify-center p-4 text-center">
          <div className="flex">
            <h1 className="text-stone-950">stat</h1>
          </div>
          <PieChart chartData={data3} />
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
          <BarChart chartData={data2} />
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
