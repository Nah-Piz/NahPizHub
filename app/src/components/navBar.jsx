import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {

    const [isOnTop, setIsOnTop] = useState(true);
    const searchInputRef = useRef(null);
    const logoRef = useRef(null);
    const navigate = useNavigate();
    const [currentTab,setCurrentTab] = useState("Home");

    useEffect(() => {
        window.addEventListener('scroll', function () {
            (window.scrollY > 50) ? setIsOnTop(false) : setIsOnTop(true);
        });
    }, []);

    const handleSearchBn = async () => {
        const value = searchInputRef.current.value;
        if (value.trim() !== "") {
            navigate(`/search/${value.trim()}`);
            searchInputRef.current.value = "";
        } else { 
            searchInputRef.current.className = "show-search";
            searchInputRef.current.focus();
            if (window.innerWidth < 768) logoRef.current.innerText = "";
            setTimeout(() => {
                if (searchInputRef.current.value.trim() === "") {
                    searchInputRef.current.className = "hidden-search";
                    if (window.innerWidth < 768) logoRef.current.innerText = "NahPizHub";
                }
            }, 30000);
        }
    }

    return (  
        <header className={!isOnTop ? "scrolled" : ""}>
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <i className="fas fa-film"></i>
                        <span ref={logoRef}>NahPizHub</span>
                    </div>

                    <nav className="nav top-nav">
                        <ul> 
                            <li>
                                <NavLink
                                    to={"/"}
                                    onClick={()=>setCurrentTab("home")}
                                    className={`${currentTab === "home" ? "active" : ""}`}
                                >Home</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/movies"
                                    onClick={()=>setCurrentTab("movies")}
                                    className={`${currentTab === "movies" ? "active" : ""}`}
                                >Movies</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/tv-series"
                                    onClick={()=>setCurrentTab("series")}
                                    className={`${currentTab === "series" ? "active" : ""}`}
                                >TV Shows</NavLink>
                            </li>
                            <li><NavLink
                                    to="/trending"
                                    onClick={()=>setCurrentTab("trending")}
                                    className={`${currentTab === "trending" ? "active" : ""}`}
                            >Trending</NavLink>
                            </li>
                            <li><NavLink
                                    to="/feeds"
                                    onClick={()=>setCurrentTab("feeds")}
                                    className={`${currentTab === "feeds" ? "active" : ""}`}
                            >Feeds & News</NavLink>
                            </li>
                        </ul>
                    </nav>

                    <div className="user-actions">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="hidden-search"
                                ref={searchInputRef}
                            />
                            <span onClick={handleSearchBn}>
                                <i className="fas fa-search search-btnx"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="header-content btm-nav">
                    <nav className="nav">
                        <ul> 
                            <li>
                                <NavLink
                                    to={"/"}
                                    onClick={()=>setCurrentTab("home")}
                                    className={`${currentTab === "home" ? "active" : ""}`}
                                >Home</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/movies"
                                    onClick={()=>setCurrentTab("movies")}
                                    className={`${currentTab === "movies" ? "active" : ""}`}
                                >Movies</NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/tv-series"
                                    onClick={()=>setCurrentTab("series")}
                                    className={`${currentTab === "series" ? "active" : ""}`}
                                >TV Shows</NavLink>
                            </li>
                            <li><NavLink
                                    to="/trending"
                                    onClick={()=>setCurrentTab("trending")}
                                    className={`${currentTab === "trending" ? "active" : ""}`}
                            >Trending</NavLink>
                            </li>
                            <li><NavLink
                                    to="/feeds"
                                    onClick={()=>setCurrentTab("feeds")}
                                    className={`${currentTab === "feeds" ? "active" : ""}`}
                            >Feeds & News</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default NavBar;