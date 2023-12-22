import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler'; 
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line

/**
 * @swagger
 * /api/people/tmdb/popular/page{page}:
 *   get:
 *    tags:
 *     - "People"
 *    summary: "Get popular people"
 *    description: "Get popular people"
 *    produces:
 *     - "application/json"
 *    parameters:
 *     - in: path
 *       name: "page"
 *       description: "Page number"
 *       required: true
 *       schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: "successful operation"
 *      404:
 *        description: "People not found"
 *    security:
 *      - api_key: [TMDBAPIKEY]
 * 
 */

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

/**
 * @swagger
 * /api/people/tmdb/popular/page{page}:
 *   get:
 *    tags:
 *     - "People"
 *    summary: "Get popular people"
 *    description: "Get popular people"
 *    produces:
 *     - "application/json"
 *    parameters:
 *     - in: path
 *       name: "page"
 *       description: "Page number"
 *       required: true
 *       schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: "successful operation"
 *      404:
 *        description: "People not found"
 *    security:
 *      - api_key: [TMDBAPIKEY]
 * 
 */

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

/**
 * @swagger
 * /api/people/tmdb/popular/page{page}:
 *   get:
 *    tags:
 *     - "People"
 *    summary: "Get popular people"
 *    description: "Get popular people"
 *    produces:
 *     - "application/json"
 *    parameters:
 *     - in: path
 *       name: "page"
 *       description: "Page number"
 *       required: true
 *       schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: "successful operation"
 *      404:
 *        description: "People not found"
 *    security:
 *      - api_key: [TMDBAPIKEY]
 * 
 */

// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});


async function registerUser(req, res) {
    // Add input validation logic here
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}

/**
 * @swagger
 * /api/people/tmdb/popular/page{page}:
 *   get:
 *    tags:
 *     - "People"
 *    summary: "Get popular people"
 *    description: "Get popular people"
 *    produces:
 *     - "application/json"
 *    parameters:
 *     - in: path
 *       name: "page"
 *       description: "Page number"
 *       required: true
 *       schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: "successful operation"
 *      404:
 *        description: "People not found"
 *    security:
 *      - api_key: [TMDBAPIKEY]
 * 
 */

router.post('/:userName/favourites', asyncHandler(async (req, res) => {
    const newFavourite = req.body.id;
    const userName = req.params.userName;
    const movie = await movieModel.findByMovieDBId(newFavourite);
    const user = await User.findByUserName(userName);
    if (user.favourites.includes(movie.id)) {
      res.status(201).json({code: 201, msg: 'Already exists in favourites.'})
  } else {
    await user.favourites.push(movie.id);
    await user.save(); 
    res.status(201).json(user); 
  }
  }));

  /**
 * @swagger
 * /api/people/tmdb/popular/page{page}:
 *   get:
 *    tags:
 *     - "People"
 *    summary: "Get popular people"
 *    description: "Get popular people"
 *    produces:
 *     - "application/json"
 *    parameters:
 *     - in: path
 *       name: "page"
 *       description: "Page number"
 *       required: true
 *       schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: "successful operation"
 *      404:
 *        description: "People not found"
 *    security:
 *      - api_key: [TMDBAPIKEY]
 * 
 */

  router.get('/:userName/favourites', asyncHandler( async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findByUserName(userName);
    res.status(200).json(user.favourites);
  }));


  /**
 * @swagger
 * /api/people/tmdb/popular/page{page}:
 *   get:
 *    tags:
 *     - "People"
 *    summary: "Get popular people"
 *    description: "Get popular people"
 *    produces:
 *     - "application/json"
 *    parameters:
 *     - in: path
 *       name: "page"
 *       description: "Page number"
 *       required: true
 *       schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: "successful operation"
 *      404:
 *        description: "People not found"
 *    security:
 *      - api_key: [TMDBAPIKEY]
 * 
 */

  router.post('/:username/movie/:id/favourites', asyncHandler(async (req, res) => {
    const newFavourite = req.params.id;
    const userName = req.params.username;
    const user = await User.findByUserName(userName);
    const index = user.favourites.indexOf(newFavourite)
    await user.favourites.splice(index, 1);
    await user.save(); 
    return res.status(201).json(user); 
  }));

export default router;