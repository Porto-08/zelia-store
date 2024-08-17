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
  graphColor?: string;
};


export default function BarGraphic({
  data,
  label,
  graphTitle,
  graphColor,
}: BarGraphicProps) {
  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-2xl text-white font-bold">{graphTitle}</h2>
      <Bar
        data={{
          labels: data.map((item) => item.label),
          datasets: [
            {
              label,
              data: data.map((item) => item.value),
              backgroundColor: graphColor || "#5856d6",
              borderColor: graphColor || "#5856d6",
              borderWidth: 1,
            },
          ],
        }}
        options={{
          color: "#fff",
          layout: {
            padding: {
              left: 25,
              right: 25,
              top: 25,
              bottom: 25,
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "#fff",
              },       
              position: "bottom",
            },
            tooltip: {
              enabled: true,
            },
            datalabels: {
              color: "#fff",
              align: "top",
              anchor: "end",
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
                  color: "#fff",
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
