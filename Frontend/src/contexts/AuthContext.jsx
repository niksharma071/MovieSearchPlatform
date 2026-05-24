import { createContext, useContext, useEffect, useState } from 'react';
import {
  getCurrentUser,
  logoutUser,
  loginUser,
  signupUser,
  addToWishlist as apiAddToWishlist,
  removeFromWishlist as apiRemoveFromWishlist,
} from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    setUser(response.data.data);
    return response;
  };

  const signup = async (payload) => {
    const response = await signupUser(payload);
    setUser(response.data.data);
    return response;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const addToWishlist = async (movie) => {
    const response = await apiAddToWishlist(movie);
    setUser((prev) => (prev ? { ...prev, wishlist: response.data.data.wishlist } : prev));
    return response;
  };

  const removeFromWishlist = async (movieId) => {
    const response = await apiRemoveFromWishlist(movieId);
    setUser((prev) => (prev ? { ...prev, wishlist: response.data.data.wishlist } : prev));
    return response;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, addToWishlist, removeFromWishlist }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
