import { useQuery } from "@apollo/client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { CURRENT_USER } from "../queries/queries";

export const UserContext = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { data, loading } = useQuery(CURRENT_USER, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    !loading && setUser(data ? data.user : null);
  }, [data]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useCurrentUser = () => useContext(UserContext);
