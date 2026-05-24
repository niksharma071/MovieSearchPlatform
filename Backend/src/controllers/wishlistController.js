import tmdb from '../config/tmdb.js';
import User from '../models/User.js';

export const getWishlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('wishlist');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const movies = await Promise.all(
      user.wishlist.map(async (entry) => {
        if (typeof entry === 'number') {
          try {
            const response = await tmdb.get(`/movie/${entry}`);
            return response.data;
          } catch (err) {
            return null;
          }
        }

        return entry;
      })
    );

    res.status(200).json({
      success: true,
      data: movies.filter(Boolean),
    });
  } catch (err) {
    next(err);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const movie = req.body.movie;
    const movieId = Number(req.body.movieId || movie?.id);

    if (!movieId) {
      return res.status(400).json({ success: false, message: 'Movie ID is required' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const alreadyExists = user.wishlist.some((entry) => {
      if (typeof entry === 'number') return entry === movieId;
      return entry?.id === movieId;
    });

    if (alreadyExists) {
      return res.status(409).json({ success: false, message: 'Movie already in wishlist' });
    }

    const wishlistEntry = typeof movie === 'object' && movie !== null ? movie : { id: movieId };
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { wishlist: wishlistEntry } },
      { new: true }
    );

    res.status(200).json({ success: true, data: { wishlist: updatedUser.wishlist } });
  } catch (err) {
    next(err);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);
    if (!movieId) {
      return res.status(400).json({ success: false, message: 'Movie ID is required' });
    }

    let updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { wishlist: movieId } },
      { new: true }
    );

    updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { wishlist: { id: movieId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: { wishlist: updatedUser.wishlist } });
  } catch (err) {
    next(err);
  }
};
