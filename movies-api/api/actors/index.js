import express from 'express';
import asyncHandler from 'express-async-handler';
import Actor from './actorModel'; 
import { getActor, getActorMovieCredits, searchActors, getPopularActors } from '../tmdb-api'; 

const router = express.Router();

router.get('/:id', asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    let actor = await Actor.findByActorDBId(id);
    if (!actor) {
      const actorDetails = await getActor(id);
      actor = new Actor(actorDetails);
      await actor.save();
    }
    res.status(200).json(actor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}));


router.get('/popular', asyncHandler(async (req, res) => {
  const page = req.query.page || 1; // Default to page 1 if not specified
  try {
    const popularActors = await getPopularActors(page);
    res.status(200).json(popularActors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}));


// Get actor's movie credits
router.get('/:id/movie_credits', asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const actorMovieCredits = await getActorMovieCredits(id);
    res.status(200).json(actorMovieCredits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}));

router.get('/search/person', asyncHandler(async (req, res) => {
  const query = req.query.q; 
  if (!query) {
      return res.status(400).json({ message: 'Query parameter "q" is required' });
  }
  try {
      const results = await searchActors(query);
      res.status(200).json(results);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}));


export default router;
