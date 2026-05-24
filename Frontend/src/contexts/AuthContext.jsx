import { createContext, useContext, useEffect, useState } from 'react';
import {
  getCurrentUser,
  logoutUser,
  loginUser,
  signupUser,
  addToWatchlist as apiAddToWatchlist,
  removeFromWatchlist as apiRemoveFromWatchlist,
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

  const addToWatchlist = async (movie) => {
    const response = await apiAddToWatchlist(movie);
    setUser((prev) => (prev ? { ...prev, watchlist: response.data.data.watchlist } : prev));
    return response;
  };

  const removeFromWatchlist = async (movieId) => {
    const response = await apiRemoveFromWatchlist(movieId);
    setUser((prev) => (prev ? { ...prev, watchlist: response.data.data.watchlist } : prev));
    return response;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, addToWatchlist, removeFromWatchlist }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
