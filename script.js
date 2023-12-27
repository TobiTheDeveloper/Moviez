const { query } = require("express");

//API Key
const API_KEY = "da4b66d16efcf73caaa311e01941af0b";
const baseURL = "https://image.tmdb.org/t/p/w500";
const posterPath = "/example_poster.jpg";
const fullPosterURL = baseURL + posterPath;
// Result: "https://image.tmdb.org/t/p/w500/example_poster.jpg"

// APIs
const apiPaths = {
    searchMovie: (query) => ''
}