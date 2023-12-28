// API Key
const API_KEY = "da4b66d16efcf73caaa311e01941af0b";
const baseURL = "https://api.themoviedb.org/3";


// APIs
const apiPaths = {
    searchMovie: (query) => `${baseURL}/search/movie?query=${query}&api_key=${API_KEY}`,
    findGenres: `${baseURL}/genre/movie/list?api_key=${API_KEY}`,
    findCast: (movie_id) => `${baseURL}/movie/${movie_id}/credits?api_key=${API_KEY}`,
    findPerson: (person_id) => `${baseURL}/person/${person_id}?api_key=${API_KEY}`,
};

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
    const url = `${baseURL}/search/movie?query=${query}&api_key=${API_KEY}`;
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
    const url = `${baseURL}/movie/${movieId}?api_key=${API_KEY}`;
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
    const url = `${baseURL}/movie/${movieId}/credits?api_key=${API_KEY}`;
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
    const url = `${baseURL}/person/${personId}?api_key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error getting person details:", error);
        throw error;
    }
};

// Function to get list of movie genres
const getMovieGenres = async () => {
    const url = `${baseURL}/genre/movie/list?api_key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.genres;
    } catch (error) {
        console.error("Error getting movie genres:", error);
        throw error;
    }
};

// Display Movie Details Function:
const displayMovieDetails = (movieObj) => {
    // Update the movie details container with information from movieObj
    movieNameElement.textContent = movieObj.title;
    titleElement.textContent = movieObj.original_title;
    ratingsElement.textContent = movieObj.vote_average.toFixed(1);
    descriptionElement.textContent = movieObj.overview;

    // Clear existing genres list
    while (genreListElement.firstChild) {
        genreListElement.removeChild(genreListElement.firstChild);
    }

    // Fetch and display movie genres
    getMovieGenres()
        .then(movieGenres => {
            // Display only the top 2 genres
            movieGenres.slice(0, 2).forEach(genre => {
                const li = document.createElement('li');
                li.textContent = genre.name;
                genreListElement.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error fetching movie genres:", error);
        });

    // Fetch and display cast details
    getMovieCast(movieObj.id)
        .then(castDetails => {
            // Implement logic to display cast details in the castDetailsElement
            // You can use addCastToCastDetailsContainer function or customize as needed
        })
        .catch(error => {
            console.error("Error fetching cast details:", error);
        });

    // Show the movie container
    movieContainer.style.display = "block";
    movieListContainer.style.display = "none";
    clearSearchMovieListContainer();
    searchInput.value = "";
};



// Functions for search movie list:
const buildSearchMovieList = (moviesList) => {
    // Clear existing search movie list container
    while (movieListContainer.firstChild) {
        movieListContainer.removeChild(movieListContainer.firstChild);
    }

    // Build and display search movie list
    moviesList.forEach(movie => {
        const p = document.createElement('p');
        p.textContent = movie.title;
        movieListContainer.appendChild(p);

        p.addEventListener('click', () => displayMovieDetails(movie));
    });

    // Show or hide the search movie list container based on input value
    movieListContainer.style.display = searchInput.value !== "" ? "block" : "none";
};

const clearSearchMovieListContainer = () => {
    // Clear existing search movie list container
    while (movieListContainer.firstChild) {
        movieListContainer.removeChild(movieListContainer.firstChild);
    }
};

// Event Listeners:
// Event listener for input changes (searching for movies)
searchInput.addEventListener('input', async () => {
    try {
        const searchResults = await searchMovies(searchInput.value);
        buildSearchMovieList(searchResults.slice(0, 10));
    } catch (error) {
        console.error("Error searching for movies:", error);
    }
});

// Event listener for hiding the search movie list container on focus out
searchInput.addEventListener('focusout', () => {
    setTimeout(() => {
        movieListContainer.style.display = "none";
    }, 130);
});

// Event Listener for Search Button
searchButton.addEventListener('click', async () => {
    try {
        const searchResults = await searchMovies(searchInput.value);
        buildSearchMovieList(searchResults.slice(0, 10));
    } catch (error) {
        console.error("Error searching for movies:", error);
    }
});