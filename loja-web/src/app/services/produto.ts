import api from "./api";

export const getProductsList = async (): Promise<Product[]> => {
  return await api.get("/produto").then((response) => response.data);
};

export const getProductDetails = async (
  productName: string
): Promise<Product> => {
  return await api
    .get(`/produto/${productName}`)
    .then((response) => response.data);
};
