import express from 'express';
import asyncHandler from 'express-async-handler';
import Review from './reviewModel';
import { getMovieReviews } from '../tmdb-api';

const router = express.Router();

// Get reviews 
router.get('/movie/:id/reviews', asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const localReviews = await Review.find({ movieId: id });
    const tmdbReviews = await getMovieReviews(id);
    const combinedReviews = [...localReviews, ...tmdbReviews.results];
    res.status(200).json(combinedReviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error });
  }
}));

// Post a review 
router.post('/movie/:id/reviews', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const newReview = new Review({
    ...req.body,
    movieId: id,
    author: req.body.author || 'Anonymous',
    created_at: new Date(),
    updated_at: new Date(),
  });

  try {
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error posting review', error: error });
  }
}));

// Update a review 
router.put('/movie/:id/reviews/:reviewId', asyncHandler(async (req, res) => {
  const { id, reviewId } = req.params;

  try {
    const reviewToUpdate = await Review.findOne({ _id: reviewId, movieId: id });
    if (reviewToUpdate) {
      reviewToUpdate.content = req.body.content || reviewToUpdate.content;
      reviewToUpdate.rating = req.body.rating || reviewToUpdate.rating;
      reviewToUpdate.updated_at = new Date();

      await reviewToUpdate.save();
      res.status(200).json(reviewToUpdate);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error: error });
  }
}));

// Delete a review 
router.delete('/movie/:id/reviews/:reviewId', asyncHandler(async (req, res) => {
  const { id, reviewId } = req.params;

  try {
    const reviewToDelete = await Review.findOneAndDelete({ _id: reviewId, movieId: id });
    if (reviewToDelete) {
      res.status(200).json({ message: 'Review deleted', reviewId: reviewId });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error });
  }
}));

export default router;

