import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  movieId: { type: Number, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
