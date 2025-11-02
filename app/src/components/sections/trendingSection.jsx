import { useEffect, useState } from "react";
import { callMe } from "../../services/api";
import MovieCard from "../movieCard";
import MovieSkeletonCard from "../movieSkeletonCard";
import Pagination from "../pagination";

function TrendingSection() {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [paging,setPaging] = useState({
        currentPage:1,
        totalPages:1,
        totalResults:0,
    });
    
    useEffect(() => {
        document.title = "Trending Movies - NahPizHub";
        const fetchMovies = async () => { 
            setIsLoading(true);
            try {
                const data = await callMe('discover');
                setMovies(data.results);
            } catch (error) {
                console.error("Error fetching trending movies:", error);
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
            const data = await callMe('discover?page='+newPage);
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
            <section className="mov-action-hero top-pd">
                <div className="mov-container">
                    <div className="mov-hero-content">
                        <div className="mov-genre-badge">
                            <i className="fas fa-fire"></i>
                            Action Genre
                        </div>
                        <h1 className="mov-hero-title">WHAT'S EVERYONE WATCHING</h1>
                        <p className="mov-hero-subtitle">Dive into the buzz. Track the charts. Discover what everyone's watching, streaming, and talking about right now.
                        </p>

                        <div className="mov-hero-stats">
                            <div className="mov-stat">
                                <div className="mov-stat-value">1,200+</div>
                                <div className="mov-stat-label">Trending Hype</div>
                            </div>
                            <div className="mov-stat">
                                <div className="mov-stat-value">4.8★</div>
                                <div className="mov-stat-label">Average Rating</div>
                            </div>
                            <div className="mov-stat">
                                <div className="mov-stat-value">2025</div>
                                <div className="mov-stat-label">Latest Releases</div>
                            </div>
                        </div>

                        <div className="mov-hero-actions">
                            <button className="mov-btn btn-primary">
                                <i className="fas fa-play"></i>
                                Watch Now
                            </button>
                            <button className="mov-btn btn-secondary">
                                <i className="fas fa-list"></i>
                                Browse All
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mov-floating-elements">
                    <div className="mov-floating-card"></div>
                    <div className="mov-floating-card"></div>
                    <div className="mov-floating-card"></div>
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

export default TrendingSection;