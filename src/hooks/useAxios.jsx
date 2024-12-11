import { useEffect } from "react";
import { gurdedApi } from "../api";
import useAuth from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    // request interceptor
    const requestInterceptor = gurdedApi.interceptors.request.use(
      (config) => {
        const authToken = auth?.token;

        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      gurdedApi.interceptors.request.eject(requestInterceptor);
    };
  }, [auth.token]);

  return { gurdedApi };
};
export default useAxios;
