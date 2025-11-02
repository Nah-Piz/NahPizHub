import { useLoaderData } from "react-router-dom";
import { callMe } from "../services/api";
import "./movie-dtl.css";
import { useEffect } from "react";

function MovieDetailPage() {

    const { movie, cast } = useLoaderData();
    
    useEffect(() => {
        document.title = `${movie.title || movie.name} - NahPizHub`;
    }, []);

    return (  
        <>
            {/* Movie Hero Section */}
            <section
                className="dtl-movie-hero"
                style={{
                    '--movie-image-url': `url(${movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div className="container">
                    <div
                        className="dtl-movie-hero-content"
                    >
                        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
                            alt="The Last Frontier" className="dtl-movie-poster-large"
                        />
                        <div className="dtl-movie-details">
                            <h1 className="dtl-movie-title">{ movie.title || movie.name}</h1>
                            <div className="dtl-movie-meta">
                                <span>{ new Date(movie.release_date).getFullYear() || new Date(movie.first_air_date).getFullYear()+`${(new Date(movie.first_air_date).getFullYear()!==2025) ? " - 2025" : ""}` }</span>
                                <span>{ Math.floor(movie.runtime/60) }h { Math.floor(movie.runtime%60) }m</span>
                                <span>{ movie.status }</span>
                                <div className="dtl-rating">
                                    <i className="fas fa-star"></i>
                                    <span>{ movie.vote_average.toFixed(1) }/10</span>
                                </div>
                            </div>

                            <p class="overview">{ movie.tagline }</p>

                            <div className="dtl-movie-actions">
                                <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                                    <button className="dtl-btn btn-primary">
                                        <i className="fas fa-play"></i>
                                        Watch Now
                                    </button>
                                </a>
                                <button className="dtl-btn btn-secondary">
                                    <i className="fas fa-plus"></i>
                                    Add to List
                                </button>
                                <div className="dtl-action-buttons">
                                    <button className="dtl-action-btn">
                                        <i className="far fa-thumbs-up"></i>
                                    </button>
                                    <button className="dtl-action-btn">
                                        <i className="far fa-bookmark"></i>
                                    </button>
                                    <button className="dtl-action-btn">
                                        <i className="fas fa-share"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Movie Content */}
            <section className="dtl-movie-content">
                <div className="dtl-container">
                    <div className="dtl-content-grid">
                        <div className="dtl-main-content">
                            <div className="dtl-section">
                                <h2 className="dtl-section-title">Storyline</h2>
                                <p className="dtl-overview">{ movie.overview}</p>
                            </div>

                            <div className="dtl-section">
                                <h2 className="dtl-section-title">Cast</h2>
                                <div className="dtl-cast-grid">
                                    { 
                                        cast.splice(0,10).map(member => (
                                            <div key={member.cast_id} className="dtl-cast-member">
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                                                    alt={member.name}
                                                    className="dtl-cast-photo"
                                                    title={ `${member.name} as ${member.character}` }
                                                />
                                                <div className="dtl-cast-name">{ member.name }</div>
                                                <div className="dtl-cast-character">{ member.character }</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="dtl-details-sidebar">
                            <h2 className="dtl-section-title">Details</h2>
                            <div className="dtl-detail-item">
                                <div className="dtl-detail-label">Release Date</div>
                                <div className="dtl-detail-value">{ new Date(movie.release_date).toLocaleDateString("en-US",{dateStyle:"full"}) || new Date(movie.first_air_date).toLocaleDateString("en-US",{dateStyle:"full"}) }</div>
                            </div>
                            <div className="dtl-detail-item">
                                <div className="dtl-detail-label">Budget</div>
                                <div className="dtl-detail-value">{ movie.budget===0 ? "Unknown" : "$"+movie.budget}</div>
                            </div>
                            <div className="dtl-detail-item">
                                <div className="dtl-detail-label">Popularity</div>
                                <div className="dtl-detail-value">{ movie.popularity.toFixed(2) }</div>
                            </div>
                            <div className="dtl-detail-item">
                                <div className="dtl-detail-label">Languages</div>
                                <div className="dtl-detail-value">
                                    {
                                        movie.spoken_languages.map(denre => (<span key={denre.english_name} className="dtl-genre-tag">{ denre.english_name }</span>))
                                    }
                                </div>
                            </div>
                            <div className="dtl-detail-item">
                                <div className="dtl-detail-label">Genres</div>
                                <div className="dtl-genres">
                                    {
                                        movie.genres.map(denre => (<span key={denre.id} className="dtl-genre-tag">{ denre.name }</span>))
                                    }
                                </div>
                            </div>
                            <div className="dtl-detail-item">
                                <div className="dtl-detail-label">Production Countries</div>
                                <div className="dtl-genres">
                                    {
                                        movie.production_countries.map(denre => (<span key={denre.iso_3166_1} className="dtl-genre-tag">{ denre.name }</span>))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Movies */}
            {/* <section className="dtl-similar-movies">
                <div className="dtl-container">
                    <h2 className="dtl-section-title">Similar Movies</h2>
                    <div className="dtl-movies-grid">
                        <div className="dtl-movie-card">
                            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                alt="Movie Poster" className="dtl-movie-card-poster"/>
                            <div className="dtl-movie-card-info">
                                <h3 className="dtl-movie-card-title">Midnight in Paris</h3>
                                <div className="dtl-movie-card-year">2023</div>
                            </div>
                        </div>
                        <div className="dtl-movie-card">
                            <img src="https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                alt="Movie Poster" className="dtl-movie-card-poster"/>
                            <div className="dtl-movie-card-info">
                                <h3 className="dtl-movie-card-title">Echoes of Time</h3>
                                <div className="dtl-movie-card-year">2022</div>
                            </div>
                        </div>
                        <div className="dtl-movie-card">
                            <img src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                alt="Movie Poster" className="dtl-movie-card-poster"/>
                            <div className="dtl-movie-card-info">
                                <h3 className="dtl-movie-card-title">Shadow Protocol</h3>
                                <div className="dtl-movie-card-year">2023</div>
                            </div>
                        </div>
                        <div className="dtl-movie-card">
                            <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                                alt="Movie Poster" className="dtl-movie-card-poster"/>
                            <div className="dtl-movie-card-info">
                                <h3 className="dtl-movie-card-title">Ocean's Whisper</h3>
                                <div className="dtl-movie-card-year">2022</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
}

export default MovieDetailPage;

export const MovieDetailLoader = async ({ params }) => { 
    const { id } = params;
    try {
        const res = await callMe(`movie/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};