import { useEffect } from "react";

function FeedsSection() {

    useEffect(() => { 
        document.title = "Feeds & News - NahPizHub";
    },[])

    return (  
        <>
            <section className="mov-action-hero top-pd">
                <div className="mov-container">
                    <div className="mov-hero-content">
                        <div className="mov-genre-badge">
                            <i className="fas fa-fire"></i>
                            Action Genre
                        </div>
                        <h1 className="mov-hero-title"> Beyond the Trailers. Beyond the Hype.</h1>
                        <p className="mov-hero-subtitle">Get real-time popularity rankings, deep-dive reviews, and hidden gems before they blow up.
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
        </>
    );
}

export default FeedsSection;