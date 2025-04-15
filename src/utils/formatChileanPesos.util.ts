export const formatChileanPesos = (amount: number): string => {
  return `CLP ${new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    notation: "standard",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)}`;
};
