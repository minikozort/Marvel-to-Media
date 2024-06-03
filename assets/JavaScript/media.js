const tmdbKey = "a70f2e920e9ea44a64b46b5c1e563605";
const baseUrl = "https://api.themoviedb.org/3";
const movieSection = $("#search-results-right");
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
      movieSection.empty();
      results.forEach((movie) => {
        const mediaCard = $("<div>");
        mediaCard.addClass("card ").css({ width: "200px" });
        const cardHeader = $("<div>").text(movie.original_title);
        cardHeader.addClass("card-divider");
        const image = $("<img>");
        const imageUrl = movie.backdrop_path
          ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
          : "https://as1.ftcdn.net/v2/jpg/01/34/69/04/1000_F_134690471_gkhcYkLqUQ8Ooc81J1ugeS2CJEqMseJP.jpg";
        image.attr("src", imageUrl);
        const cardSection = $("<div>");
        cardSection.addClass("card-section");
        const overview = $("<p>").text("Overview: " + movie.overview);
        const releaseDate = $("<p>").text(
          "Release Date: " + movie.release_date
        );
        const popularity = $("<p>").text("Popularity: " + movie.popularity);
        cardSection.append(releaseDate, popularity, overview);
        mediaCard.append(cardHeader, image, cardSection);
        movieSection.append(mediaCard);
      });
    });
}
