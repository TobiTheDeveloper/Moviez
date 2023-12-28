//API Key
const API_KEY = "da4b66d16efcf73caaa311e01941af0b";
const baseURL = "https://image.tmdb.org/t/p/w500";
const posterPath = "/example_poster.jpg";
const fullPosterURL = baseURL + posterPath;
// Result: "https://image.tmdb.org/t/p/w500/example_poster.jpg"

// APIs
const apiPaths = {
    searchMovie: (query) => `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`,
    findGenres: `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
    findCast: (movie_id) => `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}`,
    findPerson: (person_id) => `https://api.themoviedb.org/3/person/${person_id}?api_key=${API_KEY}`,
}

// Search For Movies Section
const searchInput = document.querySelector('.main__searchField .input');
const movieListContainer = document.querySelector('.main__searchField .movie-list-container');
const searchButton = document.querySelector('.main__searchBtn button');

// Movie Container
const movieContainer = document.querySelector('.main__movie-container-details .movie-container');
const movieImageContainer = document.querySelector('.main__movie-container-details .movie-container .movie-image');
const movieNameElement = document.querySelector('.main__movie-container-details .movie-container .movie-details .movie-heading .movie-name');
const titleElement = document.querySelector('.main__movie-container-details .movie-container .movie-details .movie-title span');
const genreListElement = document.querySelector('.main__movie-container-details .movie-container .movie-details .movie-genre .genre-list');
const ratingsElement = document.querySelector('.main__movie-container-details .movie-container .movie-details .ratings span');
const descriptionElement = document.querySelector('.main__movie-container-details .movie-container .movie-details .description');

// Cast Detail Container
const castDetailContainer = document.querySelector('.main__movie-container-details .main__cast-detail-container');
const castDetailsElement = document.querySelector('.main__movie-container-details .main__cast-detail-container .cast-details');


// Function to search for movies
const searchMovies = async (query) => {
    const url = `${tmdbBaseURL}/search/movie?query=${query}&api_key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error searching for movies:", error);
        throw error;
    }
};

// Function to get movie details by ID
const getMovieDetails = async (movieId) => {
    const url = `${tmdbBaseURL}/movie/${movieId}?api_key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error getting movie details:", error);
        throw error;
    }
};

// Function to get movie cast by movie ID
const getMovieCast = async (movieId) => {
    const url = `${tmdbBaseURL}/movie/${movieId}/credits?api_key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.cast;
    } catch (error) {
        console.error("Error getting movie cast:", error);
        throw error;
    }
};

// Function to get person details by person ID
const getPersonDetails = async (personId) => {
    const url = `${tmdbBaseURL}/person/${personId}?api_key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error getting person details:", error);
        throw error;
    }
};

// Function to get list of genres
const getGenres = async () => {
    const url = `${tmdbBaseURL}/genre/movie/list?api_key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.genres;
    } catch (error) {
        console.error("Error getting genres:", error);
        throw error;
    }
};
