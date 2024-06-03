const characterInput = document.querySelector("#custom-search-input");
const searchSubmit = document.querySelector("#search-button");

let character = JSON.parse(localStorage.getItem("character"));

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
  // Check if the character is already in the search history
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
  const uniqueCharacters = new Set(character); // Using Set to keep unique characters
  uniqueCharacters.forEach((c) => {
    const searchHistoryCharacter = $("<button>");
    searchHistoryCharacter
      .addClass("history-of-search-button button secondary")
      .text(c);
    $("#search-history-buttons").append(searchHistoryCharacter);
  });
}

$("#search-history-buttons").on(
  "click",
  ".history-of-search-button",
  function (event) {
    event.preventDefault();
    const characterName = $(event.target).text();
    // Check if the character is already in the search history
    if (character.includes(characterName)) {
      $("#custom-search-input").val(characterName);
      handleSearch();
    } else {
      // If not in the search history, display an alert or perform any other action
      alert("This character is not in the search history!");
    }
  }
);
searchSubmit.addEventListener("click", handleSearch);
