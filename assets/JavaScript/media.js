// TMDB (The Movie Database) API key
const tmdbKey = "a70f2e920e9ea44a64b46b5c1e563605";

// Base URL for the TMDB API
const baseUrl = "https://api.themoviedb.org/3";

// Reference to the HTML element where movie results will be displayed
const movieSection = $("#search-results-right");

/**
 * Searches for movies by character name using the TMDB API
 * @param {string} characterInput - The input character name to search for
 */
function searchMoviesByName(characterInput) {
  const endpoint = "/search/movie";
  const requestUrl = `${baseUrl}${endpoint}?api_key=${tmdbKey}&query=${encodeURIComponent(
    characterInput
  )}`;

  // Fetch movie data from the TMDB API
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Get the first three movie results
      const results = data.results.slice(0, 3);

      // Clear previous movie results
      movieSection.empty();

      // Loop through each movie result and create elements to display them
      results.forEach((movie) => {
        // Create a card for each movie
        const mediaCard = $("<div>");
        mediaCard.addClass("card").css({ width: "200px" });

        // Create and set the card header with the movie title
        const cardHeader = $("<div>").text(movie.original_title);
        cardHeader.addClass("card-divider");

        // Create an image element for the movie backdrop
        const image = $("<img>");
        const imageUrl = movie.backdrop_path
          ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
          : "https://as1.ftcdn.net/v2/jpg/01/34/69/04/1000_F_134690471_gkhcYkLqUQ8Ooc81J1ugeS2CJEqMseJP.jpg";
        image.attr("src", imageUrl);

        // Create a section for additional movie details
        const cardSection = $("<div>");
        cardSection.addClass("card-section");

        // Create and set the overview, release date, and popularity elements
        const overview = $("<p>").text("Overview: " + movie.overview);
        const releaseDate = $("<p>").text(
          "Release Date: " + movie.release_date
        );
        const popularity = $("<p>").text("Popularity: " + movie.popularity);

        // Append the movie details to the card section
        cardSection.append(releaseDate, popularity, overview);

        // Append the header, image, and details section to the media card
        mediaCard.append(cardHeader, image, cardSection);

        // Append the media card to the movie section in the HTML
        movieSection.append(mediaCard);
      });
    });
}
