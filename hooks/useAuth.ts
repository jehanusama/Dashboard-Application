import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import { logout } from "@/store/authSlice";

export function useAuth() {
  const { user, token, isAuthenticated, isInitialized } = useAppSelector(
    (state: RootState) => state.auth,
  );
  const dispatch = useAppDispatch();
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
