import { useQuery } from "@tanstack/react-query";
import CheckProtectedRoute from "../libs/api/FetchProtectedRoute";

const useAuth = () => {
  const { data, isLoading, error } = useQuery(
    ["auth"],
    async () => await CheckProtectedRoute(),
    {
      retry: false,
    }
  );

  return { data, isLoading, error };
};

export default useAuth;
