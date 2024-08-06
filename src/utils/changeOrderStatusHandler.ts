import { toast } from "react-toastify";
import { updateOrder } from "../../api/modules/orders";
import { OrderStatus } from "../app/orders/type";

export const changeOrderStatusHandler = async (orderId: number) => {
  try {
    await updateOrder(orderId, { status: OrderStatus.RETIRADO });

    toast.success("Pedido marcado como retirado");
  } catch (error) {
    console.error(error);
    toast.error("Erro ao marcar pedido como retirado");
  }
};