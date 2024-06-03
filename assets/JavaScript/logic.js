// Get references to the input and button elements
const characterInput = document.querySelector("#custom-search-input");
const searchSubmit = document.querySelector("#search-button");

// Retrieve the search history from localStorage, if it exists
let character = JSON.parse(localStorage.getItem("character"));

/**
 * Handles the search event when the search button is clicked or form is submitted
 * @param {Event} event - The event object
 */
function handleSearch(event) {
  // Prevent the default form submission behavior if the event exists
  if (event) {
    event.preventDefault();
  }

  // Check if the input field is empty and alert the user if it is
  if (!characterInput.value) {
    alert("You need a search input value!");
    return;
  }

  // Initialize the search history array if it doesn't exist
  if (!character) {
    character = [];
  }

  // Get the character name from the input field
  let characterChoice = characterInput.value;

  // Add the character to the search history and save it to localStorage
  if (event) {
    character.push(characterChoice);
    localStorage.setItem("character", JSON.stringify(character));
  }

  // Clear the input field
  characterInput.value = "";

  // Call functions to get data from APIs and update the search history
  getMarvelApi(characterChoice);
  searchMoviesByName(characterChoice);
  searchHistory();
}

/**
 * Updates the search history display with buttons for each searched character
 */
function searchHistory() {
  // Clear the search history display
  $("#search-history-buttons").html("");

  // Use a Set to keep only unique characters in the search history
  const uniqueCharacters = new Set(character);

  // Create a button for each unique character and add it to the display
  uniqueCharacters.forEach((c) => {
    const searchHistoryCharacter = $("<button>");
    searchHistoryCharacter
      .addClass("history-of-search-button button secondary")
      .text(c);
    $("#search-history-buttons").append(searchHistoryCharacter);
  });
}

// Event listener for click events on the search history buttons
$("#search-history-buttons").on(
  "click",
  ".history-of-search-button",
  function (event) {
    event.preventDefault();
    const characterName = $(event.target).text();

    // If the character is in the search history, set it as the input value and trigger a search
    if (character.includes(characterName)) {
      $("#custom-search-input").val(characterName);
      handleSearch();
    } else {
      // Alert the user if the character is not in the search history
      alert("This character is not in the search history!");
    }
  }
);

// Add an event listener to the search button to handle the search
searchSubmit.addEventListener("click", handleSearch);
