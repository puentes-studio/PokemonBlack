const pokemonNameInput = document.getElementById("pokemon-name");
const suggestionsList = document.getElementById("suggestions");
const pokemonCardContainer = document.getElementById("pokemon-img");
const pokemonNameContent = document.getElementById("name");
const pokemonImgSrcFront = document.getElementById("front-image");
const pokemonImgSrcBack = document.getElementById("back-image");
const pokemonImgSrcFrontShiny = document.getElementById("front-image-shiny");
const pokemonImgSrcBackShiny = document.getElementById("back-image-shiny");
const pokemonTypeContent = document.getElementById("type");
const pokemonWeightContent = document.getElementById("weight");
const pokemonHeightContent = document.getElementById("height");
const pokemonHpContent = document.getElementById("hp");
const pokemonAttackContent = document.getElementById("attack");
const pokemonDefenseContent = document.getElementById("defense");
const pokemonSpeedContent = document.getElementById("speed");
const pokemonSpecialAttackContent = document.getElementById("special-attack");
const pokemonSpecialDefenseContent = document.getElementById("special-defense");
const errorSpan = document.getElementById("no-pokemon");
const statsTextElements = document.querySelectorAll('.pokemonCard .pokemonStats');
let allPokemon = [];





function displayPokemonInfo(data) {
  pokemonNameContent.textContent = data.name;
  pokemonImgSrcFront.src = data.sprites.front_default;
  pokemonImgSrcBack.src = data.sprites.back_default;
  pokemonTypeContent.textContent = data.types.map(type => type.type.name).join(', ');
  pokemonWeightContent.textContent = data.weight / 10 + " kg";
  pokemonHeightContent.textContent = data.height / 10 + " m";
  pokemonHpContent.textContent = data.stats[0].base_stat;
  pokemonAttackContent.textContent = data.stats[1].base_stat;
  pokemonDefenseContent.textContent = data.stats[2].base_stat;
  pokemonSpecialAttackContent.textContent = data.stats[3].base_stat;
  pokemonSpecialDefenseContent.textContent = data.stats[4].base_stat;
  pokemonSpeedContent.textContent = data.stats[5].base_stat;
  pokemonImgSrcFrontShiny.src = data.sprites.front_shiny;
  pokemonImgSrcBackShiny.src = data.sprites.back_shiny;

  statsTextElements.forEach((element) => {  
    element.style.display = 'block';
  });


  showCardContainer();
}


function removePokemonInfo() {
  pokemonNameContent.textContent = "";
  pokemonImgSrcFront.src = "";
  pokemonImgSrcBack.src = "";
  pokemonWeightContent.textContent = "";
  pokemonHeightContent.textContent = "";
  pokemonHpContent.textContent = "";
  pokemonAttackContent.textContent = "";
  pokemonDefenseContent.textContent = "";
  pokemonSpeedContent.textContent = "";
  pokemonImgSrcFrontShiny.src = "";
  pokemonImgSrcBackShiny.src = "";
}

function showShiny() {
  pokemonImgSrcFrontShiny.style.opacity = 1;
}

function hideShiny() {
  pokemonImgSrcFrontShiny.style.opacity = 0;
}

function hideCardContainer() {
  pokemonCardContainer.style.opacity = 0;
}

function showCardContainer() {
  pokemonCardContainer.style.opacity = 1;
}

function showErrorMsg() {
  errorSpan.style.opacity = 1;
}

function hideErrorMsg() {
  errorSpan.style.opacity = 0;
}

function isValidPokemonName(pokemonName) {
  console.log({ validation: pokemonName.trim(), pokemonName });
  return pokemonName.trim() !== "";
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function handleDataApi(data) {
  data.name = capitalizeFirstLetter(data.name);
  displayPokemonInfo(data);
  showCardContainer();
}

function handleErrorApi(error) {
  hideCardContainer();
  removePokemonInfo();
  hideStats();
  showErrorMsg();
  errorSpan.textContent = "Pokemon not found, please try again.";
}

function hideStats() {
  statsTextElements.forEach((element) => {
    element.style.display = 'none';
  });
}



// Function to display dropdown search suggestions
function displaySuggestionsDropdown(suggestions) {
  suggestionsList.innerHTML = "";
    if (suggestions.length > 0) {
      suggestionsList.style.display = "block";
    } else {
      suggestionsList.style.display = "none";
      return;
    }
  suggestions.forEach(pokemon => {
    const listItem = document.createElement("li");
      listItem.textContent = pokemon.name;
      listItem.addEventListener("click", function () {
      pokemonNameInput.value = pokemon.name;
      suggestionsList.style.display = "none";
      searchSelectedPokemon(pokemon.name); 
    });
    suggestionsList.appendChild(listItem);
  });
}

function searchPokemon() {
    const pokemonName = pokemonNameInput.value.toLowerCase();
      if (!isValidPokemonName(pokemonName)) {
      return alert("Write a valid Pokemon");
  }
  fetchPokemonData(pokemonName); 
}

function fetchPokemonData(pokemonName) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then(handleDataApi)
    .catch(handleErrorApi);
}

function searchSelectedPokemon(selectedPokemon) {
  fetchPokemonData(selectedPokemon); 
}

function searchPokemon() {
  const pokemonName = pokemonNameInput.value.toLowerCase();
  if (!isValidPokemonName(pokemonName)) {
    return alert("Write a valid Pokemo");
  }
  // Fetching API
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then(handleDataApi)
    .catch(handleErrorApi);
}


pokemonNameInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchPokemon();
  }
});


// Events related to the suggestions of pokemon starting with the same letter
pokemonNameInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchPokemon();
  }
});


window.addEventListener("load", function () {
  fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1118`)
    .then(response => response.json())
    .then(data => {
      allPokemon = data.results;
    })
    .catch(error => console.error('Error fetching data:', error));
});


pokemonNameInput.addEventListener("input", function () {
  const searchTerm = pokemonNameInput.value.toLowerCase().trim();
  if (!searchTerm) {
    suggestionsList.style.display = "none";
    return;
  }
  const filteredPokemon = allPokemon.filter(pokemon => pokemon.name.includes(searchTerm));
  displaySuggestionsDropdown(filteredPokemon);
});


suggestionsList.addEventListener("mouseover", function (event) {
  if (event.target.tagName === "LI") {
    event.target.style.cursor = "pointer";
    event.target.title = "Select Pokemon";
  }
});


suggestionsList.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    const selectedPokemon = event.target.textContent;
    pokemonNameInput.value = selectedPokemon;
    suggestionsList.style.display = "none"; // hide the suggestion
    // Realice the pokemon search
    searchPokemon();
  }
});















