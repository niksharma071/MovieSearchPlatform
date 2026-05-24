import tmdb from '../config/tmdb.js';


export const getPopular = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const { data } = await tmdb.get('/movie/popular', { params: { page } });
    res.json({ success: true, data });
    // console.log("popularcall");
  } catch (err) {
    next(err);
  }
};

export const getTrending = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const { data } = await tmdb.get('/trending/movie/week', { params: { page } });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const searchMovies = async (req, res, next) => {
  try {
    const { query, page = 1 } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Query parameter is required',
      });
    }

    const { data } = await tmdb.get('/search/movie', {
      params: { query: query.trim(), page },
    });

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getGenres = async (req, res, next) => {
  try {
    const { data } = await tmdb.get('/genre/movie/list');
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const discoverByGenre = async (req, res, next) => {
  try {
    const { with_genres, page = 1, sort_by = 'popularity.desc' } = req.query;

    if (!with_genres) {
      return res.status(400).json({
        success: false,
        message: 'with_genres parameter is required',
      });
    }

    const { data } = await tmdb.get('/discover/movie', {
      params: { with_genres, page, sort_by },
    });

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid movie ID' });
    }

    const { data } = await tmdb.get(`/movie/${id}`);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getMovieCredits = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid movie ID' });
    }

    const { data } = await tmdb.get(`/movie/${id}/credits`);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getMovieVideos = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid movie ID' });
    }

    const { data } = await tmdb.get(`/movie/${id}/videos`);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getRecommendations = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page = 1 } = req.query;

    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid movie ID' });
    }

    const { data } = await tmdb.get(`/movie/${id}/recommendations`, {
      params: { page },
    });

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

