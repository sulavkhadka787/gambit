import { User } from "@auth0/auth0-spa-js";
import { createContext, useContext } from "react";

export const UserContext = createContext({ user: {}, setUser: () => {} });

export function useUser() {
  return useContext(UserContext);
}
