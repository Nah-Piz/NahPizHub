import ImagePlaceholder from "./imagePlaceholder";

function MovieSkeletonCard() {
    return (  
        <div className="movie-card-skeleton">
            <ImagePlaceholder />
            <div className="skeleton-info">
                <div className="skeleton-title"></div>
                <div className="skeleton-meta">
                    <div className="skeleton-year"></div>
                    <div className="skeleton-rating"></div>
                </div>
                <div className="skeleton-actions">
                    <div className="skeleton-action"></div>
                    <div className="skeleton-action"></div>
                    <div className="skeleton-action"></div>
                </div>
            </div>
        </div>
    );
}

export default MovieSkeletonCard;