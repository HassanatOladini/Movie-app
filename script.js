const discover_url =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9886d43edf7edbf644d5931f936a10f4&page=1";
const search_url =
  "https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=9886d43edf7edbf644d5931f936a10f4&page=1";
const image_path = "https://image.tmdb.org/t/p/w1280";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

//GET MOVIES FUNCTION

getMovies(discover_url);

async function getMovies(url) {
  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    const nextPageUrl =
      data.page < data.total_pages &&
      url.replace(`page=${data.page}`, `page=${data.page + 1}`);

    const previousPageUrl =
      data.page > 1 &&
      url.replace(`page=${data.page}`, `page=${data.page - 1}`);
    showMovies(data.results, nextPageUrl, previousPageUrl);
  } else {
    alert("Could not retrieve movies");
  }
}

//FUNCTION TO DISPLAY THE MOVIES
function showMovies(movies, nextPageUrl, previousPageUrl) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, backdrop_path, vote_average, overview } = movie;

    const movieElements = document.createElement("div");
    movieElements.classList.add("movie");

    const imageHTML =
      poster_path || backdrop_path
        ? `<img src="${
            image_path + (poster_path || backdrop_path)
          }" alt="${title}" />`
        : "";
    movieElements.innerHTML = `
        ${imageHTML}
        <div class="movie-information">
        <h3>${title}</h3>
          <span class="movie-rating">${vote_average}</span> 
        </div>
        <div class="overview">
          <h3>overview</h3>
          ${overview}
        </div> `;

    main.appendChild(movieElements);
  });
  //BUTTONS

  if (previousPageUrl) {
    const previousPageButton = document.createElement("button");
    previousPageButton.className = "buttons";
    previousPageButton.innerText = "previous page";
    previousPageButton.addEventListener("click", () => {
      getMovies(previousPageUrl);

      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });

    main.appendChild(previousPageButton);
  }

  if (nextPageUrl) {
    const nextPageButton = document.createElement("button");
    nextPageButton.className = "buttons";
    nextPageButton.innerText = "next page";
    nextPageButton.addEventListener("click", () => {
      getMovies(nextPageUrl);

      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });

    main.appendChild(nextPageButton);
  }
}

//EVENT LISTENER
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchConditions = search.value;

  if (searchConditions && searchConditions !== "") {
    getMovies(`${search_url}&query=${searchConditions}`);
    search.value = "";
  } else {
    window.location.reload();
  }
});
