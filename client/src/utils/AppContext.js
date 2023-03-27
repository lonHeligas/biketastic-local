import React, { createContext, useContext, useEffect, useState } from 'react';
import cookie from 'js-cookie';

export const AppContext = createContext({});
export const useAppCtx = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [ user, setUser ] = useState(null);
  const [ cartItems, setCartItems ] = useState(JSON.parse(localStorage.getItem('cartItems')) || []);

  const logout = () => {
    cookie.remove("auth-token");
    setUser(null);
    window.location.replace("/");
  };

  const verifyUser = async () => {
    const authCookie = cookie.get("auth-token");
    if (authCookie) {
      const query = await fetch("/api/user/verify", {
        method: "post",
        body: JSON.stringify({}),
        headers: {
          "Content-Type": "application/json",
          "Auth-Token": authCookie,
        },
      });
      const result = await query.json();
      if (result) {
        setUser(result);
      }
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems])

  return (
    <AppContext.Provider value={{ user, setUser, cartItems, setCartItems, logout}}>
      {children}
    </AppContext.Provider>
  )
}
