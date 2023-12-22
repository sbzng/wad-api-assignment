const baseUrl = "http://localhost:8080/api";
const token = localStorage.getItem("token");

export const getMovies = async (page = 1) => {
  const response = await fetch(`${baseUrl}/movies?page=${page}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error('Error fetching movies');
  }
  return await response.json();
};

export const getMovie = async (id) => {
  const response = await fetch(`${baseUrl}/movies/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Error fetching movie details');
  }
  return await response.json();
};

export const searchMovies = async (query) => {
  const response = await fetch(`${baseUrl}/movies/search?query=${encodeURIComponent(query)}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error('Error searching movies');
  }
  return await response.json();
};

export const searchActors = async (query) => {
  const response = await fetch(`${baseUrl}/actors/search?query=${encodeURIComponent(query)}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error('Error searching actors');
  }
  return await response.json();
};

export const searchTVShows = async (query) => {
  const response = await fetch(`${baseUrl}/tvshows/search?query=${encodeURIComponent(query)}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error('Error searching TV shows');
  }
  return await response.json();
};

export const getUpcomingMovies = async (page = 1) => {
  const response = await fetch(`${baseUrl}/movies/upcoming?page=${page}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error('Error fetching upcoming movies');
  }
  return await response.json();
};

export const getPopularTV = async (page = 1) => {
  const response = await fetch(`${baseUrl}/tvshows/popular?page=${page}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error('Error fetching popular TV shows');
  }
  return await response.json();
};

export const getPopularActors = async (page = 1) => {
  const response = await fetch(`${baseUrl}/actors/popular?page=${page}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error('Error fetching popular actors');
  }
  return await response.json();
};

export const getGenres = async () => {
  const response = await fetch(`${baseUrl}/movies/genres`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error('Error fetching genres');
  }
  return await response.json();
};

export const getMovieImages = async (id) => {
  const response = await fetch(`${baseUrl}/movies/${id}/images`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Error fetching images for movie ${id}`);
  }
  return await response.json();
};

export const getMovieReviews = async (id) => {
  const response = await fetch(`${baseUrl}/movies/${id}/reviews`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Error fetching reviews for movie ${id}`);
  }
  return await response.json();
};

export const getMovieCredits = async (id) => {
  const response = await fetch(`${baseUrl}/movies/${id}/credits`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Error fetching credits for movie ${id}`);
  }
  return await response.json();
};

export const getActorMovieCredits = async (id) => {
  const response = await fetch(`${baseUrl}/actors/${id}/movie_credits`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Error fetching movie credits for actor ${id}`);
  }
  return await response.json();
};

export const getActor = async (id) => {
  const response = await fetch(`${baseUrl}/actors/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Error fetching details for actor ${id}`);
  }
  return await response.json();
};

export const getTVShows = async (id) => {
  const response = await fetch(`${baseUrl}/tvshows/${id}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Error fetching details for TV show ${id}`);
  }
  return await response.json();
};

export const login = async (username, password) => {
  return fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  }).then(res => res.json())
};

export const signup = async (username, password) => {
  return fetch('/api/users?action=register', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
  }).then(res => res.json())
};

export const addFavourite = async (username, id) => {
  return fetch(`/api/users/${username}/favourites`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    body: JSON.stringify({ id })
  }).then(res => res.json())
};

export const getFavourites = async (username) => {
  return fetch(`/api/users/${username}/favourites`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get'
  }).then(res => res.json())
};

export const deleteFavourite = async (username, movie) => {
  return fetch(`/api/users/${username}/movie/${movie.id}/favourites`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post'
  }).then(res => res.json())
};
