export type ReportGenericData = {
  label: string;
  value: number;
};

export interface SalesAndStockFromProducts {
  productName: string;
  quantity_sale: number;
  left_in_stock: number;
}