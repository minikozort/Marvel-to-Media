const characterInput = document.querySelector('#custom-search-input');
const searchSubmit = document.querySelector('#search-button');

let character = JSON.parse(localStorage.getItem('character'));

function handleSearch(event) {
    event.preventDefault();
    if (!characterInput.value) {
        alert('You need a search input value!');
        return;
    }
    if (!character) {
        character = [];
    }
    let characterChoice = characterInput.value;
    character.push(characterChoice);
    localStorage.setItem('character', JSON.stringify(character));

    characterInput.value = "";
    searchHistory();
}

function searchHistory() {
    $("#search-history-buttons").html("");
    for (const c of character) {
      const searchHistoryCharacter = $("<button>");
      searchHistoryCharacter.addClass("history of search button")
      const aTag = $("<a>");
      searchHistoryCharacter.append(aTag);
      aTag.text(c).addClass("button secondary");
      $("#search-history-buttons").append(searchHistoryCharacter);
      searchHistoryCharacter.on('click', function (event) {
        event.preventDefault();
        $("#custom-search-input").val(c);
      });
    }
  }

searchSubmit.addEventListener('click', handleSearch);