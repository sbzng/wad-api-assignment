import express from 'express';
import asyncHandler from 'express-async-handler';
import { getPopularTV, getTVShowDetails, searchTVShows} from '../tmdb-api'; 

const router = express.Router();

router.get('/popular', asyncHandler(async (req, res) => {
  try {
    const page = req.query.page || 1; 
    const popularTVShows = await getPopularTV(page); 
    res.status(200).json(popularTVShows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}));


router.get('/:id', asyncHandler(async (req, res) => {
  try {
    const tvShowId = req.params.id;
    const tvShowDetails = await getTVShowDetails(tvShowId);
    res.status(200).json(tvShowDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}));

router.get('/search/tv', asyncHandler(async (req, res) => {
  const query = req.query.q; 
  if (!query) {
      return res.status(400).json({ message: 'Query parameter "q" is required' });
  }
  try {
      const results = await searchTVShows(query);
      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}));


export default router;