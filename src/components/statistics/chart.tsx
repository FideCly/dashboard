import { Bar, Pie, Line } from 'react-chartjs-2';

const BarChart = ({ chartData }) => {
  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

const PieChart = ({ chartData }) => {
  return (
    <div>
      <Pie data={chartData} />
    </div>
  );
};

const LineChart = ({ chartData }) => {
  return (
    <div className="flex-1">
      <Line data={chartData} />
    </div>
  );
};

export { BarChart, PieChart, LineChart };
