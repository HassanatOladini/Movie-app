const api_url =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9886d43edf7edbf644d5931f936a10f4&page=1";
const image_path = "https://image.tmdb.org/t/p/w1280";
const search_url =
  'https://api.themoviedb.org/3/search/movie?api_key=9886d43edf7edbf644d5931f936a10f4&query"';

//GET MOVIES FUNCTION

getMovies(api_url);

async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();

  console.log(data.results);
}
