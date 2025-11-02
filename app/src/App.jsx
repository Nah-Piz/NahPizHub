import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import RootLayout from "./layouts/rootLayout"
import HomePage from "./pages/home"
import MovieDetailPage, { MovieDetailLoader } from "./pages/movieDtlPage"
import LoginPage from "./pages/auth/loginPage"
import SignupPage from "./pages/auth/signupPage"
import FavouritesPage from "./pages/favouritesPage"
import SearchPage, { searchPageLoader } from "./pages/searchPage"
import MoviesSection from "./components/sections/movies.section"
import SeriesSection from "./components/sections/series.section"
import TrendingSection from "./components/sections/trendingSection"
import FeedsSection from "./components/sections/feedsSection"
import SeriesDetailPage, { seriesDetailLoader } from "./pages/seriesDtlPage"


function App() {

  const mainRoute = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movie/:id" element={<MovieDetailPage />} loader={MovieDetailLoader} />
          <Route path="series/:id" element={<SeriesDetailPage />} loader={seriesDetailLoader} />
          <Route path="search/:query" element={<SearchPage />} loader={searchPageLoader} />
          <Route path="favourite" element={<FavouritesPage />} />
          <Route path="movies" element={<MoviesSection />} />
          <Route path="tv-series" element={<SeriesSection />} />
          <Route path="trending" element={<TrendingSection />} />
          <Route path="feeds" element={<FeedsSection />} />
        </Route>
        <Route path="auth/">
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route> 
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={mainRoute} />
    </>
  )
}

export default App