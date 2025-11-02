import { useLoaderData, useParams } from "react-router-dom";
import MovieCard from "../components/movieCard";
import { callMe } from "../services/api";
import { useEffect, useState } from "react";

function SearchPage() {

    const [searchResults, setSearchResults] = useState(useLoaderData().results || []);
    
    const { query } = useParams();

    const resultsLength = useLoaderData().total_results;

    useEffect(() => { 
        document.title = `${query} Search Results - NahPizHub`;
    }, [query]);

    const handleFilter = (filter) => { 
        setCurrentFilter(filter);
        if (filter === "All") {
            setSearchResults( useLoaderData() );
        } else if (filter === "Movies") {
            const filtered = useLoaderData().results.filter(item => item.media_type === "movie");
            setSearchResults(filtered);
        } else if (filter === "TV Shows") {
            const filtered = useLoaderData().results.filter(item => item.media_type === "tv");
            setSearchResults(filtered);
        }
    };

    const [currentFilter,setCurrentFilter] = useState("All");

    return (  
        <>
            <section className="search-results-hero top-pd">
                <div className="container-search">
                    <div className="search-header">
                        <button className="back-button">
                            <i className="fas fa-arrow-left"></i>
                        </button>
                        <h1 className="search-title">
                            Search Results for: "<span className="search-query">{ query }</span>"
                        </h1>
                    </div>

                    <div className="results-stats">
                        <span>{ resultsLength } results found</span>
                    </div>

                    <div className="search-filters">
                        {
                            ["All", "Movies", "TV Shows"].map((filter) => (
                                <button
                                    key={filter}
                                    className={`filter-btn ${currentFilter === filter ? "active" : ""}`}
                                    onClick={()=>handleFilter(filter)}
                                >{filter}</button>
                            ))
                        }
                    </div>
                </div>
            </section>
            <div className="movies-grid">
                {
                    <MovieCard movies={searchResults} />
                }
            </div>
        </>
    );
}

export default SearchPage; 


export const searchPageLoader = async ({ params }) => {
    const { query } = params;
    console.log("Loader query:", query);
    try {
        const data = await callMe(`search/${query}`);
        console.log("Loader data:", data);
        return data;
    } catch (error) {
        console.log(error);
    }
}