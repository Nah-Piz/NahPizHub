import { useEffect, useState } from "react";
import MovieSkeletonCard from "../movieSkeletonCard";
import MovieCard from "../movieCard";
import { callMe } from "../../services/api";
import Pagination from "../pagination";

function SeriesSection() {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [paging,setPaging] = useState({
        currentPage:1,
        totalPages:1,
        totalResults:0,
    });
    
    useEffect(() => { 
        document.title = "TV Series - NahPizHub";
        const fetchMovies = async () => { 
            setIsLoading(true);
            try {
                const data = await callMe('series');
                setMovies(data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovies();
    }, []);

    const handlePageChange = async (newPage) => {
        if (newPage < 1 || newPage > paging.totalPages) return;
        setIsLoading(true);
        try {
            const data = await callMe('series?page='+newPage);
            setPaging({
                currentPage: data.page,
                totalPages: data.total_pages,
                totalResults: data.total_results,
            });
            setMovies(data.results);
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (  
        <>
            <section className="ser-tv-series-hero top-pd">
                <div className="ser-container">
                    <div className="ser-hero-content">
                        <div className="ser-genre-badge">
                            <i className="fas fa-tv"></i>
                            TV Series Collection
                        </div>
                        <h1 className="ser-hero-title">BINGE-WORTHY TV SERIES</h1>
                        <p className="ser-hero-subtitle">Dive into captivating stories that unfold across seasons. From gripping dramas
                            to hilarious comedies, discover your next favorite show and get lost in endless entertainment.</p>

                        <div className="ser-hero-stats">
                            <div className="ser-stat">
                                <div className="ser-stat-value">500+</div>
                                <div className="ser-stat-label">TV Shows</div>
                            </div>
                            <div className="ser-stat">
                                <div className="ser-stat-value">10K+</div>
                                <div className="ser-stat-label">Episodes</div>
                            </div>
                            <div className="ser-stat">
                                <div className="ser-stat-value">4.7★</div>
                                <div className="ser-stat-label">Average Rating</div>
                            </div>
                            <div className="ser-stat">
                                <div className="ser-stat-value">2023</div>
                                <div className="ser-stat-label">New Seasons</div>
                            </div>
                        </div>

                        <div className="ser-hero-actions">
                            <button className="ser-btn btn-primary">
                                <i className="fas fa-compass"></i>
                                Discover Shows
                            </button>
                            <button className="ser-btn btn-secondary">
                                <i className="fas fa-play"></i>
                                Where to Watch
                            </button>
                        </div>
                    </div>
                </div>

                <div className="ser-tv-show-cards">
                    <div className="ser-tv-card">
                        <div className="ser-season-badge">S3</div>
                    </div>
                    <div className="ser-tv-card">
                        <div className="ser-season-badge">S1</div>
                    </div>
                    <div className="ser-tv-card">
                        <div className="ser-season-badge">S5</div>
                    </div>
                </div>
            </section>
            <div class="movies-grid" style={{paddingTop: "30px"}}>
                {
                    isLoading ? (<MovieSkeletonCard />) : (
                        <>
                            <MovieCard movies={movies} />
                            <Pagination
                                paging={paging}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )
                }
                
            </div>
        </>
    );
}

export default SeriesSection;