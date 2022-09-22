import { useContext } from "react";
import { AuthContext } from "../context/UserContextProvider";

const useAuth = () => useContext(AuthContext);

export default useAuth;
