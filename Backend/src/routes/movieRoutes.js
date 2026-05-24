import express from 'express';

import {
  getPopular,
  getTrending,
  searchMovies,
  getGenres,
  discoverByGenre,
  getMovieById,
  getMovieCredits,
  getMovieVideos,
  getRecommendations,
} from '../controllers/movieController.js'; 

const router = express.Router();

router.get('/popular',   getPopular);
router.get('/trending',  getTrending);
router.get('/search',    searchMovies);
router.get('/genres',    getGenres);
router.get('/discover',  discoverByGenre);

router.get('/:id',                 getMovieById);
router.get('/:id/credits',         getMovieCredits);
router.get('/:id/videos',          getMovieVideos);
router.get('/:id/recommendations', getRecommendations);

export default router;