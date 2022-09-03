import axios, { AxiosRequestConfig, Method } from "axios";

/**
 * Méthode générique qui s'occupera de tous les appels API
 *
 * @param path - Chemin api, ex: `/pets`
 * @param method - Méthode HTTP
 * @param config - Config optionnelle d'axios
 * @returns Retourne une promesse du type passé en Generic TS
 */
export const callAPI = async <R>(
  path: string,
  method: Method,
  config: Partial<AxiosRequestConfig> = {}
): Promise<R> => {
  const res = await axios({
    url: import.meta.env.VITE_API_URL + path,
    method,
    ...config,
  });

  return res.data;
};
