import { Router } from "express";
import { getAllMovies, getAllSeries, getDiscoverMovies, getMovieDetails, getPopularMovies, getSeriesDetails, searchMovies } from "../conrollers/movie.controllers.js";

const router = Router();

router.get('/popular', getPopularMovies);
router.get('/discover', getDiscoverMovies);
router.get('/movies', getAllMovies);
router.get('/series', getAllSeries);
router.get('/search/:query', searchMovies);
router.get('/movie/:id', getMovieDetails);
router.get('/series/:id', getSeriesDetails);

export default router;