const characterInput = document.querySelector('#custom-search-input');
const searchSubmit = document.querySelector('#search-button')

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
    console.log(characterChoice);
    characterInput.value = "";
}

searchSubmit.addEventListener('click', handleSearch);