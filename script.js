'use strict'
const API_URL='https://api.themoviedb.org/3/movie/550?api_key=cf664f1cb1d4549e151d87069e9781e8&page=1'
const IMG_PATH='https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg'
const searchurl="https://api.themoviedb.org/3/search/movie?api_key={api_key}&query='"
const main = document.getElementById("main");
const form = document.getElementById("search_form");
const search = document.getElementById("search");
const logo = document.querySelector(".logo");
async function getMovies(url){
  const res=await fetch(url)
  const data =await res.json()
  if(data.results.length === 0){
    main.innerHTML=" ";
    const createErrorEle=document.createElement('div');
    createErrorEle.classList.add('errorHandle');
    createErrorEle.innerHTML=`<h1> oh no there is no data found </h1>`;
     main.appendChild(createErrorEle);
  }else{
    showMovies(data.results)
  }
}
function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const createEL = document.createElement('div');
    createEL.classList.add('movie');

    createEL.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="movie image" class="movie-img" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getOverviewRating(
            vote_average
          )}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3 class="overview">
            ${overview}
          </h3>
        </div>
    `;

    main.appendChild(createEL);
      });
}
function getOverviewRating(rating) {
  if (rating >= 8) {
    return 'green';
  } else if (rating >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}
getMovies(API_URL)