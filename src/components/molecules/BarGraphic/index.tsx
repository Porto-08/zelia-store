"use client";
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ReportGenericData } from '@/app/reports/types';
ChartJS.register(...registerables);
ChartJS.register(ChartDataLabels);

type BarGraphicProps = {
  data: ReportGenericData[];
  label: string;
  graphTitle: string;
};


export default function BarGraphic({
  data,
  label,
  graphTitle,
}: BarGraphicProps) {
  

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl text-secondary font-bold">{graphTitle}</h2>
      <Bar
        data={{
          labels: data.map((item) => item.label),
          datasets: [
            {
              label,
              data: data.map((item) => item.value),
              backgroundColor: "#5856d6",
              borderColor: "#5856d6",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          color: "#000",
          plugins: {
            legend: {
              labels: {
                color: "#000",
              },       
              position: "bottom",
            },
            tooltip: {
              enabled: true,
            },
            datalabels: {
              color: "#fff",
              align: "center",
              anchor: "center",
              font: {
                size: 16,
              },
              formatter: function (value, context) {
                return value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                });
              },
            },
          },
          scales: {
            y: {
              display: false,
            },
            x: {
              ticks: {
                  color: "#000",
              },
              grid: {
                display: false,
              },
            },
          },
        }}
      />
    </div>
  );
}
