import { NavLink } from "react-router-dom";
import ImagePlaceholder from "./imagePlaceholder";

function MovieCard({movies}) {
    return (  
        <>
            { 
                movies.map((movie) => (
                    <div key={movie.id} class="movie-card">
                        {
                            movie.poster_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    
                                    alt={movie.title}
                                    title={movie.title}
                                    class="movie-poster" />
                            ) : (
                                <ImagePlaceholder />
                            )
                        }
                        <div class="movie-info">
                            <NavLink to={`/${ movie.media_type === "tv" ? "series" : "movie" }/${movie.id}`} >
                                <h3 class="movie-title">{movie.title || movie.name}</h3>
                            </NavLink>
                            <div class="movie-meta">
                                <span class="year">{ new Date(movie.release_date).getFullYear() || new Date(movie.first_air_date).getFullYear()+`${(new Date(movie.first_air_date).getFullYear()!==2025) ? " - 2025" : ""}` }</span>
                                <span class="rating"><i class="fas fa-star"></i> { movie.popularity.toFixed(1) }k</span>
                            </div>
                            <div class="movie-actions">
                                <button class="action-btn"><i class="far fa-heart"></i></button>
                                <span className="media-type">{ movie.media_type === "tv" ? "TV Series" : "Movie" }</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default MovieCard;