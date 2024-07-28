export default function formatPrice(value: string) {
  if (!value) {
    return 0;
  }

  if (value.includes(",")) {
    return parseFloat(value.replace(",", "."));
  }

  return parseFloat(value);
}