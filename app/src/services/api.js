export async function callMe(endpoint) {
  const res = await fetch("http://localhost:3202/api/"+endpoint);  
  const data = await res.json();
  return data.data;
}


export const LatestMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json()
    return data.results
}

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json()
    return data.results
}

export const getMovieGenres = async () => {
    const response = await fetch('https://api.themoviedb.org/3/genre/tv/list?language=en', options);
    const data = await response.json();
    return data.genres;
}