import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies,
    getGenres,
    getMovieCredits,
    getMovieImages,
    searchMovies
  } from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/tmdb/movie/:id/credits', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (!Regex.test(id)) {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
    else {
        try {
            const credits = await getMovieCredits(id);
            res.status(200).json(credits);
        } catch (error) {
            res.status(500).json({message: error.message, status_code: 500});
        }
    }
}));

router.get('/tmdb/movie/:id/images', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    if (!Regex.test(id)) {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
    else {
        try {
            const images = await getMovieImages(id);
            res.status(200).json(images);
        } catch (error) {
            res.status(500).json({message: error.message, status_code: 500});
        }
    }
}));

router.get('/search/movie', asyncHandler(async (req, res) => {
    const query = req.query.q; 
    if (!query) {
        return res.status(400).json({ message: 'Query parameter "q" is required' });
    }
    try {
        const results = await searchMovies(query);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}));




export default router;