// Marvel API key
let marvelKey = "1d8194dbe39306bb0084f04db35515ea";

// References to HTML elements for displaying results
const comicBooksResult = $("#search-results-left");
const comicCharacterResult = $("#comicbooks");

/**
 * Fetches data from the Marvel API based on the character name input
 * @param {string} characterNameInput - The input character name to search for
 */
function getMarvelApi(characterNameInput) {
  const mainUrl = `https://gateway.marvel.com`;
  const requestUrl = `${mainUrl}/v1/public/characters?nameStartsWith=${characterNameInput}&apikey=${marvelKey}`;
  
  // Fetch character data from the Marvel API
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const results = data.data.results[0];
      const characterId = results.id;

      // Fetch additional data by character ID
      searchByCharacterId(characterId);

      const characterName = results.name;

      // Clear previous results
      $("#search-results-left").empty();

      // Create and populate a new div with character information
      const characterInfo = $("<div>");
      characterInfo.addClass("info card").css({ height: "300px" });

      const cardHeader = $("<h1>").text(characterName);
      const characterDescription = results.description;
      const description = $("<p>").text(characterDescription);
      const characterComics = results.comics.available;
      const comics = $("<p>").text("Available Comics: " + characterComics);
      const characterSeries = results.series.available;
      const series = $("<p>").text("Available Series: " + characterSeries);
      const characterStories = results.stories.available;
      const stories = $("<p>").text("Available Stories: " + characterStories);

      // Append all elements to the characterInfo div
      characterInfo.append(cardHeader, description, comics, series, stories);

      // Append the characterInfo div to the search results section
      comicBooksResult.append(characterInfo);
    });
}

/**
 * Fetches comics data for a specific character ID from the Marvel API
 * @param {number} characterId - The ID of the character to search for
 */
function searchByCharacterId(characterId) {
  const mainUrl = `https://gateway.marvel.com`;
  const requestUrl = `${mainUrl}/v1/public/characters/${characterId}/comics?&apikey=${marvelKey}`;

  // Fetch comics data from the Marvel API
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Clear previous comics content
      $("#comicbooks").empty();

      // Create a new div for the comics section
      const comicsSection = $("<div>").addClass("comicsSection");

      // Loop through the first three results and create elements for each comic
      for (let i = 0; i <= 3; i++) {
        const result = data.data.results[i];
        const thumbnailUrl = `${result.thumbnail.path}.${result.thumbnail.extension}`;
        const comicUrl = result.urls[0].url;

        // Create an image element for the comic thumbnail
        const image = $("<img>").attr("src", thumbnailUrl);

        // Create a link element that wraps the image and points to the comic URL
        const link = $("<a>")
          .attr("href", comicUrl)
          .attr("target", "_blank")
          .append(image);

        // Append the link to the comics section
        $(".comicsSection").append(link);

        // Append the comics section to the comicCharacterResult element
        comicCharacterResult.append(comicsSection);
      }
    });
}