import express from 'express';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../controllers/watchlistController.js';

const router = express.Router();

router.get('/', getWatchlist);
router.post('/', addToWatchlist);
router.delete('/:movieId', removeFromWatchlist);

export default router;
