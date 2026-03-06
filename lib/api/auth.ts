import { MOCK_USER } from "../mockData/user";

export const login = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (email === "admin@test.com" && password === "123456") {
    return {
      user: MOCK_USER,
      token: "mock-jwt-token",
    };
  }

  throw new Error("Invalid email or password");
};
