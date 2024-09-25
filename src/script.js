// curl --request GET \
//      --url 'https://api.themoviedb.org/3/trending/movie/day?language=en-US' \
//      --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzEyZTdkY2RlYjc1MmU0ODYwZWJhYzI4MzAyYjcxYSIsIm5iZiI6MTcyNzEwMTQxOS42MzI4NzksInN1YiI6IjY2ZjE3NTM2MmQ5OGQ1OWNlMTNiMDUxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U1bJYKmi2NyGoeuSeLJNmAugpp4w556SLyh4KD_LrAQ' \
//      --header 'accept: application/json'

const API_URL =
  'https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=8712e7dcdeb752e4860ebac28302b71a&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=8712e7dcdeb752e4860ebac28302b71a&query="';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';
  console.log(movies);
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    console.log(title);
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
    <img
      src="${IMG_PATH + poster_path}" alt="${title}"
    />
    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    
    <div class="overview">
      <h3>overview</h3>
      ${overview}
    </div>
  </div>
  
  `;
    main.append(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_URL + searchTerm);
    search.value = '';
  } else {
    window.location.reload();
  }
});
