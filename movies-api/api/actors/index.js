import express from 'express';
import asyncHandler from 'express-async-handler';
import Actor from './actorModel'; 
import { getActor, getActorMovieCredits } from '../tmdb-api'; 

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

export default router;
