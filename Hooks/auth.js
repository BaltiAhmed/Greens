import { useState, useCallback } from "react";



export const UserAuth = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = useCallback((user, token) => {
    setUser(user);
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);


  return { token, login, logout, user };
};
