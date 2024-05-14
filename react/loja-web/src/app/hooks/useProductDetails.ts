import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "../services/produto";

export const useProductDetails = (productName: string) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["productDetails", productName],
    queryFn: () => getProductDetails(productName),
  });

  return { product: data, isPending, isError };
};
