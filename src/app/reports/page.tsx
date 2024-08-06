import BarGraphic from "@/components/molecules/BarGraphic";
import { getSalesByMonth } from "../../../api/modules/orders";

export default async function ReportsPage() {
  const salesByMonth = await getSalesByMonth();

  return (
    <main className="px-6 m-auto max-w-7xl">
      <div className="flex flex-wrap gap-5 item-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            <span className="text-primary">Relatórios</span>
          </h1>
          <span>
            Aqui você encontra gráficos e relatórios sobre os pedidos.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mt-10 min-h-96">
        <div className="bg-white p-5 rounded-lg shadow-md">
          <BarGraphic
            data={salesByMonth}
            label="Mês"
            graphTitle="Vendas por mês"
          />
        </div>
      </div>
    </main>
  );
}

export const revalidate = 2;
