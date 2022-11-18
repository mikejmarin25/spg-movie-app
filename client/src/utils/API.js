//const API_KEY = '2e4dd8e00581ce40e2b2bff93ed85eaf';
//const API_BASE = 'https://api.themoviedb.org/3';

//We need to format fetch for this new API

export const searchTheMovieDatabase = (query) => {
  return fetch(`https://api.themoviedb.org/3/search/movie?api_key=2e4dd8e00581ce40e2b2bff93ed85eaf&language=en-US&query=${query}&page=1&include_adult=false`);
};
