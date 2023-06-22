import Navbare from '@/Components/html/Navbar';
import Sidebar from '@/Components/html/Sidebar';
import { BarChart, LineChart, PieChart } from '@/Components/statistics/chart';
import { useEffect, useState } from 'react';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Select } from 'flowbite-react';
Chart.register(CategoryScale);

export default function Home () {
  //mock data
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales for 2020 (M)',
        data: [3, 2, 2, 1, 5, 6, 7],
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
        data: {},
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

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [chartData2, setChartData2] = useState({ labels: [], datasets: [] });
  const [chartData3, setChartData3] = useState({ labels: [], datasets: [] });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [date, setDate] = useState('');
  const [date2, setDate2] = useState('');
  const [date3, setDate3] = useState('');

  const [title, setTitle] = useState('Statistiques');

  useEffect(() => {
    const getChartData = async () => {
      try {
        setIsLoading(true);
        const response = fetch('/api/auth/login', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }).then(async (res) => {
            if (res.status >= 400) {
              throw new Error('Bad response from server');
            }
            return await res.json();
          });
        setChartData(await response);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getChartData();
  }, [date]);

  useEffect(() => {
    const getChartData2 = async () => {
      try {
        setIsLoading(true);
        const response = fetch('/api/auth/login', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }).then(async (res) => {
            if (res.status >= 400) {
              throw new Error('Bad response from server');
            }
            return await res.json();
          });
        setChartData2(await response);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getChartData2();
  }, [date2]);

  useEffect(() => {
    const getChartData3 = async () => {
      try {
        setIsLoading(true);
        const response = fetch('/api/auth/login', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }).then(async (res) => {
            if (res.status >= 400) {
              throw new Error('Bad response from server');
            }
            return await res.json();
          });
        setChartData3(await response);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getChartData3();
  }, [date3]);

  function actualise (arg0: number) {
    throw new Error('Function not implemented.');
  }

  return (
    <main className='bg-white rounded ronded-md'>
      <div className="flex flex-1">
        <div className="flex flex-col content-center justify-center flex-1 p-4 text-center">
          <div className='flex'>
            <h1 className='flex-1 text-stone-950'>{title}</h1>
            <Select>
              <option value="1" onSelect={() => actualise(1)}>année en cours</option>
              <option value="2" onSelect={() => actualise(2)}>mois en cours</option>
              <option value="3" onSelect={() => actualise(3)}>7 dernier jour</option>
              <option value="4" onSelect={() => actualise(4)}>jour de la veille</option>
            </Select>
          </div>
          <div className=''>
            <LineChart chartData={data} />
          </div>
        </div>
        <div className="flex flex-col content-center justify-center p-4 text-center">
          <div className='flex'>
            <h1 className='text-stone-950'>{title}</h1>
          </div>
          <PieChart chartData={data3} />
        </div>
      </div>
      <div className="flex flex-col justify-center flex-1 p-4 text-center bg-white rounded rounded-md">
        <div className='flex'>
          <h1 className='flex-1 text-stone-950'>Nombre de passage de carte par heure de la journée</h1>
          <Select>
            <option value="1" onSelect={() => actualise(1)}>année en cours</option>
            <option value="2" onSelect={() => actualise(2)}>mois en cours</option>
            <option value="3" onSelect={() => actualise(3)}>7 dernier jour</option>
            <option value="4" onSelect={() => actualise(4)}>jour de la veille</option>
            <option value="4" onSelect={() => actualise(4)}>jour de la veille</option>
          </Select>
        </div>
        <div className=''>
          <BarChart chartData={data2} />
        </div>
      </div>
    </main>
  );
}

Home.getLayout = function getLayout (page) {
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
