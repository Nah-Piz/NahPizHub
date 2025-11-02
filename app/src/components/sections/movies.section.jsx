import { useEffect, useState } from "react";
import { callMe } from "../../services/api";
import MovieCard from "../movieCard";
import MovieSkeletonCard from "../movieSkeletonCard";
import Pagination from "../pagination";

function MoviesSection() {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [paging,setPaging] = useState({
        currentPage:1,
        totalPages:1,
        totalResults:0,
    });
    
    useEffect(() => { 
        const fetchMovies = async () => {
            document.title = "Action Movies - NahPizHub";
            setIsLoading(true);
            try {
                const data = await callMe('movies');
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
        fetchMovies();
    }, []);

    const handlePageChange = async (newPage) => { 
        if (newPage < 1 || newPage > paging.totalPages) return;
        setIsLoading(true);
        try {
            const data = await callMe('movies?page='+newPage);
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
                        <h1 className="mov-hero-title">EXPLOSIVE ACTION MOVIES</h1>
                        <p className="mov-hero-subtitle">Experience heart-pounding adrenaline with the best action films. From
                            high-speed chases to epic battles, dive into a world of non-stop excitement and thrilling sequences.
                        </p>

                        <div className="mov-hero-stats">
                            <div className="mov-stat">
                                <div className="mov-stat-value">1,200+</div>
                                <div className="mov-stat-label">Action Titles</div>
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

export default MoviesSection;