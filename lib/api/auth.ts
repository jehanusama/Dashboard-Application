import { User } from "../mockData/types";
import { MOCK_USERS, MockUser } from "../mockData/user";

export const login = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const matchedUser = MOCK_USERS.find(
    (u) => u.email === email && (u as MockUser).password === password,
  );

  if (!matchedUser) {
    throw new Error("Invalid email or password");
  }

  const { password: _password, ...userWithoutPassword } =
    matchedUser as MockUser;

  return {
    user: userWithoutPassword as User,
    token: "mock-jwt-token",
  };
};
