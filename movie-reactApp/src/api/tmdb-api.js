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

/*export const getMovies = (page) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
};

export const searchMovies = (query) => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1&query=${query}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
};

export const searchActors = (query) => {
  return fetch(
    `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1&query=${query}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
};

export const searchTVShows = (query) => {
  return fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1&query=${query}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
};

export const getUpcomingMovies = (page) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
     throw error
  });
};

  export const getMovie = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getGenres = async () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        process.env.REACT_APP_TMDB_KEY +
        "&language=en-US"
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then( (response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
  
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieReviews = (id) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
      });
  };

  export const getPopularTV = (page) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  };

  export const getPopularActors= (page) => {
    return fetch(
      `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  };

  export const getActor = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getShow = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getMovieCredits = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };

  export const getActorMovieCredits = (args) => {
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.json().message);
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };*/