const tmdbKey = "a70f2e920e9ea44a64b46b5c1e563605";
const baseUrl = "https://api.themoviedb.org/3";

function searchMoviesByName(characterInput) {
  const endpoint = "/search/movie";
  const requestUrl = `${baseUrl}${endpoint}?api_key=${tmdbKey}&query=${encodeURIComponent(
    characterInput
  )}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const results = data.results.slice(0, 3); // Get the first three movies
      console.log(results);

      // Loop through each of the first three movies
      results.forEach((movie) => {
        console.log("Title:", movie.original_title);
        console.log("Overview:", movie.overview);
        console.log("Popularity:", movie.popularity);
        console.log("Release Date:", movie.release_date);

        // Check if poster_path exists
        if (movie.poster_path) {
          // Construct the full URL for the poster image
          const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          console.log("Poster Image URL:", imageUrl);
        } else {
          console.log("No poster image available");
        }

        // Check if backdrop_path exists
        if (movie.backdrop_path) {
          // Construct the full URL for the backdrop image
          const backdropUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
          console.log("Backdrop Image URL:", backdropUrl);
        } else {
          console.log("No backdrop image available");
        }
      });
    });
}