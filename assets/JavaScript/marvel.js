
let marvelKey = "1d8194dbe39306bb0084f04db35515ea";
const comicBooksResult = $("#search-results-left");
const comicCharacterResult = $("#comicbooks")
function getMarvelApi(characterNameInput) {
  const mainUrl = `https://gateway.marvel.com`;
  const requestUrl = `${mainUrl}/v1/public/characters?nameStartsWith=${characterNameInput}&apikey=${marvelKey}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const results = data.data.results[0];
      const characterId = results.id;
      searchByCharacterId(characterId);
      const characterName = results.name;
      $("#search-results-left").empty();
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
      characterInfo.append(cardHeader, description, comics, series, stories);
      comicBooksResult.append(characterInfo);
    });
}
function searchByCharacterId(characterId) {
  const mainUrl = `https://gateway.marvel.com`;
  const requestUrl = `${mainUrl}/v1/public/characters/${characterId}/comics?&apikey=${marvelKey}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Clear any existing content
      $("#comicbooks").empty();
      const comicsSection = $("<div>").addClass("comicsSection");
      // Loop through the first three results
      for (let i = 0; i <= 3; i++) {
        const result = data.data.results[i];
        const thumbnailUrl = `${result.thumbnail.path}.${result.thumbnail.extension}`;
        const comicUrl = result.urls[0].url;
        // Create image element
        const image = $("<img>").attr("src", thumbnailUrl);
        // Create link element
        const link = $("<a>")
          .attr("href", comicUrl)
          .attr("target", "_blank")
          .append(image);
        // Append link to comics section
        $(".comicsSection").append(link);
        comicCharacterResult.append(comicsSection);
      }
    });
}
