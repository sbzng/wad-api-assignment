import fetch from 'node-fetch';

export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getGenres = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch genres');
        }

        return await response.json();
    } catch (error) {
        console.error('Error in getGenres:', error);
        throw error;
    }
};


export const getPopularTV = async (page) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Unable to fetch popular TV shows.');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getTVShowDetails = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || `Unable to fetch details for TV show with ID: ${id}.`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getMovieImages = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};


export const getMovieCredits = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getMovieReviews = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};


export const getPopularActors = async (page) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Unable to fetch popular TV shows.');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const getActor = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_KEY}`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};



export const getActorMovieCredits = async (id) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.TMDB_KEY}&language=en-US`
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};


export const searchMovies = async (query) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1&query=${query}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const searchActors = async (query) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/person?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1&query=${query}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const searchTVShows = async (query) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1&query=${query}`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};