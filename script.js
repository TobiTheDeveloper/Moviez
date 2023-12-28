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

const searchInput = document.querySelector('.main__searchField input');
const searchMovieListContainer = document.querySelector('.movie-list-container');
const movieContainer = document.querySelector('.movie-container');
const castContainer = document.querySelector('.movie-container .cast-details-container');
const castDetailsContainer = document.querySelector('.movie-container .cast-details-container .cast-details');


const searchMovie = (e) => {
    const res = fetch(apiPaths.searchMovie(searchInput.value));

    res
    .then(res => res.json())
    .then(res => {
        buildSearchMovieList(res.results.slice(0,10));
    })
    .catch(error => {
        console.log(error);
    });
};

