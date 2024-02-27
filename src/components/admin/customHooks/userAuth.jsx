import { useContext } from "react";
import AuthContext from "../../../globalComponents/auth/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
