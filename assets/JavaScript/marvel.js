let marvelKey = "1d8194dbe39306bb0084f04db35515ea";

function getMarvelApi(characterNameInput) {
  const mainUrl = `https://gateway.marvel.com`;
  const requestUrl = `${mainUrl}/v1/public/characters?nameStartsWith=${characterNameInput}&apikey=${marvelKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const results = data.data.results[0];
      // console.log(data)

      const characterId = results.id;
      // console.log(characterId);

      searchByCharacterId(characterId);

      const characterDescription = results.description;
      console.log(characterDescription);

      const characterComics = results.comics.available;
      console.log(characterComics)
      // console.log(results);

      const characterName = results.name;
      console.log(characterName);

      const characterSeries = results.series.available;
      console.log(characterSeries);

      const characterStories = results.stories.available;
      console.log(characterStories);
      const exampleComicBookName = results.comics.items[0];
      // console.log(exampleComicBookName);

      const firstComicBookName = results.comics.items[0].name;
      console.log(firstComicBookName);
      const secondComicBookName = results.comics.items[1].name;
      console.log(secondComicBookName);
      const thirdComicBookName = results.comics.items[2].name;
      console.log(thirdComicBookName);


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
        console.log(data);
        const resultsOne = data.data.results[0];
        console.log(resultsOne);
        const comicUrl = resultsOne.urls[0].url;
        console.log(comicUrl);
        const thumbnailOne = `${resultsOne.thumbnail.path}.${resultsOne.thumbnail.extension}`;
        console.log(thumbnailOne);
        const resultsTwo = data.data.results[1];
        console.log(resultsTwo);
        const comicUrlTwo = resultsTwo.urls[0].url;
        console.log(comicUrlTwo);
        const thumbnailTwo = `${resultsTwo.thumbnail.path}.${resultsTwo.thumbnail.extension}`;
        console.log(thumbnailTwo);
        const resultsThree = data.data.results[2];
        console.log(resultsThree);
        const comicUrlThree = resultsThree.urls[0].url;
        console.log(comicUrlThree);
        const thumbnailThree = `${resultsThree.thumbnail.path}.${resultsThree.thumbnail.extension}`;
        console.log(thumbnailThree);
      });
  }




