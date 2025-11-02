const fetchData = async (url) => {
  try {
    const response = await fetch(url,{
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.auth_key
      }
    });
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {success: false,error: error.message}
  }
}

export const getPopularMovies = async (req, res) => { 

  try {
    const data = await fetchData(`${process.env.base_url}/movie/popular`);
    if (data.success) {
      res.json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
    
}

export const getDiscoverMovies = async (req,res) => {
  try {
    const data = await fetchData(`${process.env.base_url}/trending/all/day?language=en-US${req.query.page ? `&page=${req.query.page}` : ''}`);
    if (data.success) {
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const searchMovies = async (req, res) => { 
  const { query } = req.params;
  console.log("Backend query:", query);
  try {
    const data = await fetchData(`${process.env.base_url}/search/multi?query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false${req.query.page ? `&page=${req.query.page}` : ''}`);
    if (data.success) {
      console.log("fetched...")
      res.json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
}

export const getAllMovies = async (req, res) => { 
  try {
    const data = await fetchData(`${process.env.base_url}/trending/movie/day?language=en-US${req.query.page ? `&page=${req.query.page}` : ''}`);
    if (data.success) {
      res.json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const getAllSeries = async (req, res) => { 
  try {
    const data = await fetchData(`${process.env.base_url}/trending/tv/day?language=en-US${req.query.page ? `&page=${req.query.page}` : ''}`);
    if (data.success) {
      res.json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  } 
};

export const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    //https://api.themoviedb.org/3/movie/movie_id?language=en-US
    const { data } = await fetchData(`${process.env.base_url}/movie/${id}?language=en-US`);
    const {cast} = (await fetchData(`${process.env.base_url}/movie/${id}/credits?language=en-US`)).data;
    res.json({ success: true, data: { movie: data, cast: cast || false } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
}

export const getSeriesDetails = async (req, res) => { 
  const { id } = req.params;
  try {
    //https://api.themoviedb.org/3/tv/tv_id?language=en-US
    const { data } = await fetchData(`${process.env.base_url}/tv/${id}?language=en-US`);
    const {cast} = (await fetchData(`${process.env.base_url}/tv/${id}/credits?language=en-US`)).data;
    res.json({ success: true, data: { movie: data, cast: cast || false } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
}