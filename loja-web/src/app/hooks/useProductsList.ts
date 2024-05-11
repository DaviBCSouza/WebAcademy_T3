import { useQuery } from "@tanstack/react-query";
import { getProductsList } from "../services/produto";

export const useProductsList = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["productsList"],
    queryFn: () => getProductsList(),
  });

  return { products: data, isPending, isError };
};
