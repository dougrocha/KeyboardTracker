import { ProtectedAuth } from "../../types/user";
import AxiosClient from "../AxiosClient";

const CheckProtectedRoute = async (): Promise<ProtectedAuth> => {
  const data = await AxiosClient.get("/auth/protected").then((res) => {
    return res.data;
  });
  return data;
};

export default CheckProtectedRoute;
