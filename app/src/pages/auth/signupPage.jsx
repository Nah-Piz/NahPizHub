function SignupPage() {
    return (  
        <>
            <h1>Sign up page</h1>
            <h1>Home</h1>
            <i className="fas fas-search black" style={{ color: "black", backgroundColor: "black" }}></i>
            <i class="fas fa-search"></i>
            <ul>
                <li><NavLink to={"/"}>Home</NavLink></li>
                <li><NavLink to={"movie"}>Movie</NavLink></li>
                <li><NavLink to={"/auth/login"}>Login</NavLink></li>
                <li><NavLink to={"/auth/signup"}>Sign up</NavLink></li>
                <li><NavLink to={"/favourite"}>Favourites</NavLink></li>
            </ul>
            <div class="social-links">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
                <a href="#"><i class="fab fa-github"></i></a>
            </div>
        </>
    );
}

export default SignupPage;