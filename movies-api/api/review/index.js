import express from 'express';
import asyncHandler from 'express-async-handler';
import Review from './reviewModel';

const router = express.Router();

// Post a new review
router.post('/:movieId', asyncHandler(async (req, res) => {
  const review = new Review({ ...req.body, movieId: req.params.movieId });
  await review.save();
  res.status(201).json(review);
}));

// Get all reviews for a movie
router.get('/:movieId', asyncHandler(async (req, res) => {
  const reviews = await Review.find({ movieId: req.params.movieId });
  res.status(200).json(reviews);
}));

// Update a review
router.put('/:id', asyncHandler(async (req, res) => {
  const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedReview);
}));

// Delete a review
router.delete('/:id', asyncHandler(async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.status(204).send();
}));

export default router;
