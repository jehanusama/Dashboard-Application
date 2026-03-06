import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { logout } from "@/store/authSlice";

export function useAuth() {
  const { user, token, isAuthenticated, isInitialized } = useSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return {
    user,
    token,
    isAuthenticated,
    isInitialized,
    logout: handleLogout,
  };
}
