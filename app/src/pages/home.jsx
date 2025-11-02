import { NavLink } from "react-router-dom";
import { callMe } from "../services/api";
import { useEffect } from "react";
import { useState } from "react";
import MovieSkeletonCard from "../components/movieSkeletonCard";
import MovieCard from "../components/movieCard";

function HomePage() {

    const [popular, setPopular] = useState([]);
    const [isPopularLoading, setIsPopularLoading] = useState(false);

    const [trending, setTrending] = useState([]);
    const [isTrendingLoading, setIsTrendingLoading] = useState(false);

    useEffect(() => { 
        document.title = "Home - NahPizHub";
        async function fetchData() {

            setIsPopularLoading(true);
            setIsTrendingLoading(true);

            try {
                const data = await callMe("discover");
                setTrending(data.results.slice(0, 4));
            } catch (error) {
                console.log(error)
            } finally {
                setIsTrendingLoading(false)
            }
            
            try {
                const data = await callMe("popular");
                setPopular(data.results.slice(0, 4));
            } catch (error) {
                console.log(error)
            } finally {
                setIsPopularLoading(false);
            }
        }
        fetchData();
    }, []);

    return (  
        <>
            <section class="hero top-pd">
                <div class="container">
                    <div class="hero-content">
                        <h1>Unlimited Movies, TV Shows, and More.</h1>
                        <p>Watch anywhere. Cancel anytime. Ready to watch? Enter your email to create or restart your
                            membership.</p>
                        <div class="cta-buttons">
                            <button class="btn btn-primary">Get Started</button>
                            <button class="btn btn-secondary">Learn More</button>
                        </div>
                    </div>
                </div>
            </section>

            <main class="container">
        <div class="section-title">
            <h2>Trending Now</h2>
            <NavLink to="/trending">
                <span class="view-all">View All <i class="fas fa-chevron-right"></i></span>
            </NavLink>
        </div>

        <div class="categories">
            <div class="category active">All</div>
            <div class="category">Action</div>
            <div class="category">Comedy</div>
            <div class="category">Drama</div>
            <div class="category">Horror</div>
            <div class="category">Sci-Fi</div>
            <div class="category">Romance</div>
            <div class="category">Thriller</div>
        </div>
                
        
        <div class="movies-grid">
            {
                isTrendingLoading ? (<MovieSkeletonCard />) : (<MovieCard movies={trending} />)
            }
            
        </div>

        
        <div class="section-title">
            <h2>Popular Movies</h2>
            <NavLink to="/movies">
                <span class="view-all">View All <i class="fas fa-chevron-right"></i></span>
            </NavLink>
        </div>

        <div class="movies-grid">
            {
                isPopularLoading ? (<MovieSkeletonCard />) : (<MovieCard movies={popular} />)
            }
        </div>
        
    </main>
        </>
    );
}

export default HomePage;