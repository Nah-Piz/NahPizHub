import { callMe } from "../services/api";
import { useLoaderData } from "react-router-dom";
import './series-dtl.css';
import { useEffect } from "react";

function SeriesDetailPage() {

    const { movie, cast } = useLoaderData();

    useEffect(() => { 
        document.title = `${movie.name || "Series Details"} - NahPizHub`;
    },[]);

    const handleActionBtn = (id)=>{
        alert(id)
    };

    return (  
        <>
             {/* Series Hero  */}
            <section
                class="series-hero"
                style={{
                    '--series-image-url': `url(${movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div class="container">
                    <div class="series-hero-content">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt="The Last Kingdom"
                            class="series-poster-large"
                        />
                        <div class="series-details">
                            <h1 class="series-title">{ movie.name }</h1>
                            <div class="series-meta">
                                <span>{new Date(movie.first_air_date).getFullYear()}-{ new Date(movie.last_air_date).getFullYear() }</span>
                                <span>{ movie.number_of_seasons } Seasons</span>
                                <span>{ movie.number_of_episodes } Episodes</span>
                                <span>Drama, Action, History</span>
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <span>{ movie.vote_average.toFixed(1) }/10</span>
                                </div>
                            </div>
                            
                            <p class="overview">{ movie.tagline }</p>

                            <div class="series-actions">
                                <button
                                    onClick(()=>handleActionBtn(id))
                                    class="btn btn-primary"
                                >
                                    <i class="fas fa-play"></i>
                                    {movie.lastWatch ? "Continue" : "Start"} watching
                                </button>
                                <button
                                    onClick(()=>handleActionBtn(id))
                                    class="btn btn-secondary"
                                >
                                    <i class="fas fa-plus"></i>
                                    Add to List
                                </button>
                                <div class="action-buttons">
                                    <button 
                                        onClick(()=>handleActionBtn(id))
                                        class="action-btn"
                                    >
                                        <i class="far fa-thumbs-up"></i>
                                    </button>
                                    <button 
                                        onClick(()=>handleActionBtn(id))
                                        class="action-btn"
                                    >
                                        <i class="far fa-bookmark"></i>
                                    </button>
                                    <button class="action-btn">
                                        <i class="fas fa-share"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seasons Section */}
            <section class="seasons-section">
                <div class="container">
                    <h2 class="ser-section-title">
                        <i class="fas fa-layer-group"></i>
                        All Seasons
                    </h2>

                    <div class="seasons-grid">
                        
                        {
                            movie.seasons.map(season => (
                                <div class="season-card">
                                    <img
                                        src={ `https://image.tmdb.org/t/p/w500${season.poster_path}` }
                                        alt="Season 5" class="season-poster"
                                    />
                                    <div class="season-info">
                                        <div class="season-header">
                                            <div>
                                                <h3 class="season-title">{ season.name }</h3>
                                            </div>
                                            <div class="season-rating">
                                                <i class="fas fa-star"></i>
                                                <span>8.7</span>
                                            </div>
                                        </div>
                                        <div class="season-meta">
                                            <div class="season-year">{ new Date(season.air_date).getFullYear() }</div>
                                            <span>{ season.episode_count } Episodes</span>
                                            <span>55m avg</span>
                                        </div>
                                        <div class="season-actions">
                                            <button class="season-btn primary">
                                                <i class="fas fa-play"></i>
                                                Continue
                                            </button>
                                            <button class="season-btn">
                                                <i class="fas fa-list"></i>
                                                Episodes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

             {/* Cast Section  */}
            <section class="cast-section">
                <div class="container">
                    <h2 class="ser-section-title">
                        <i class="fas fa-users"></i>
                        Cast
                    </h2> 

                    <div class="cast-grid">
                        {
                            cast.slice(0,8).map(member => (
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
            </section>
        </>
    );
}

export default SeriesDetailPage;

export const seriesDetailLoader = async ({ params }) => { 
    const { id } = params;
    try {
        const res = await callMe('series/' + id);
        console.log("series loading done " + res);
        return res;
    } catch (error) {
        console.error("Error fetching series details:", error);
    }
};
