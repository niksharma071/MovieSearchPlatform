import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:3080/api",
  withCredentials: true,
});

export const getPopular = (page = 1) =>
  api.get(`/movie/popular`);

export const getTrending = () =>
  api.get('/movie/trending');
                                            
export const searchMovies = (query, page = 1) =>
  api.get(`/movie/search?query=${query}&page=${page}`);

export const getGenres = () =>
  api.get('/movie/genres');

export const discoverByGenre = (genreId, page = 1) =>
  api.get(`/movie/discover?with_genres=${genreId}&page=${page}`);

export const getMovieById = (id) =>
  api.get(`/movie/${id}`);

export const getMovieCredits = (id) =>
  api.get(`/movie/${id}/credits`);

export const getMovieVideos = (id) =>
  api.get(`/movie/${id}/videos`);

export const getRecommendations = (id) =>
  api.get(`/movie/${id}/recommendations`);

export const signupUser = (payload) =>
  api.post('/auth/signup', payload);

export const loginUser = (payload) =>
  api.post('/auth/login', payload);

export const getCurrentUser = () =>
  api.get('/auth/me');

export const logoutUser = () =>
  api.post('/auth/logout');

export const getWishlist = () =>
  api.get('/auth/wishlist');

export const addToWishlist = (movie) =>
  api.post('/auth/wishlist', { movie });

export const removeFromWishlist = (movieId) =>
  api.delete(`/auth/wishlist/${movieId}`);
