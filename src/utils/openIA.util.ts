import { ProductOpenIA } from "@/type";

export const analyzeImage = async (
  imageUrl: string
): Promise<ProductOpenIA> => {
  const response = await fetch("/api/product/completeIA", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: imageUrl }),
  });

  const result = (await response.json()) as ProductOpenIA;
  console.log("📦 Producto generado:", result);
  return result;
};
