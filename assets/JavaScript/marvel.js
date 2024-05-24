let marvelKey = "1d8194dbe39306bb0084f04db35515ea";

function getMarvelApi() {
  const mainUrl = `https://gateway.marvel.com`;
  const requestUrl = `${mainUrl}/v1/public/characters?apikey=${marvelKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const results = data.data.results[0];
      console.log(results);
      
      const characterName = results.name;
      console.log(results.name);

      const characterComics = results.name;
      console.log(results.comics.available);

      const characterSeries = results.name;
      console.log(results.series.available);
      
      const characterStories = results.name;
      console.log(results.stories.available);
    });
}

getMarvelApi();
