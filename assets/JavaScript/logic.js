const characterInput = document.querySelector('#custom-search-input');
const searchSubmit = document.querySelector('#search-button');

let character = JSON.parse(localStorage.getItem('character'));

function handleSearch(event) {
    if (event) {
        event.preventDefault();
    }
    if (!characterInput.value) {
        alert('You need a search input value!');
        return;
    }
    if (!character) {
        character = [];
    }
    let characterChoice = characterInput.value;
    if (event) {
        character.push(characterChoice);
        localStorage.setItem('character', JSON.stringify(character));
    }
    

    characterInput.value = "";
    getMarvelApi(characterChoice);
    searchMoviesByName(characterChoice);
    searchHistory();
}

function searchHistory() {
    $("#search-history-buttons").html("");
    for (const c of character) {
      const searchHistoryCharacter = $("<button>");
      searchHistoryCharacter.addClass("history-of-search-button button secondary").text(c);
      $("#search-history-buttons").append(searchHistoryCharacter);
    }
  }


$("#search-history-buttons").on('click', '.history-of-search-button', function (event) {
    event.preventDefault();
    const character = $(event.target);
    console.log(character.text());
    $("#custom-search-input").val(character.text());
    handleSearch();

  });
searchSubmit.addEventListener('click', handleSearch);









