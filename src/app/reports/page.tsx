import BarGraphic from "@/components/molecules/BarGraphic";
import {
  getSalesByDay,
  getSalesByMonth,
  getSalesByPaymentType,
  getSalesByProduct,
} from "../../../api/modules/orders";

export default async function ReportsPage() {
  const salesByMonth = await getSalesByMonth();
  const salesByDay = await getSalesByDay();
  const salesByPaymentType = await getSalesByPaymentType();
  const salesByProduct = await getSalesByProduct();

  return (
    <main className="flex flex-col gap-10 px-6 m-auto max-w-7xl">
      <div className="flex flex-wrap gap-5 item-center justify-between">
        <div>
          <h1 className="text-primary text-4xl font-bold">Relatórios</h1>
          <span>
            Aqui você encontra gráficos e relatórios sobre os pedidos.
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="bg-base-300 p-5 rounded-lg shadow-md">
            <BarGraphic
              data={salesByMonth}
              label="Mês"
              graphTitle="Vendas por mês"
            />
          </div>

          <div className="bg-base-300 p-5 rounded-lg shadow-md">
            <BarGraphic
              data={salesByDay}
              label="Dia"
              graphTitle="Vendas por dia"
              graphColor="#f6ad55"
            />
          </div>

          <div className="bg-base-300 p-5 rounded-lg shadow-md">
            <BarGraphic
              data={salesByPaymentType}
              label="Tipo de pagamento"
              graphTitle="Vendas por tipo de pagamento"
              graphColor="#bb86fc"
            />
          </div>

          <div className="bg-base-300 p-5 rounded-lg shadow-md">
            <BarGraphic
              data={salesByProduct}
              label="Produto"
              graphTitle="Vendas por produto"
              graphColor="#4441fa"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export const revalidate = 2;
