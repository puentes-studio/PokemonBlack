const pokeCard = document.querySelector('[data-pokemon-card]');
const pokeName = document.querySelector('[data-pokemon-name]');
const pokeImg = document.querySelector('[data-pokemon-img]');
const pokeImgContainer = document.querySelector('[data-pokemon-img-container]');
const pokeId = document.querySelector('[data-pokemon-id]');
const pokeTypes = document.querySelector('[data-pokemon-types]');
const pokeStats = document.querySelector('[data-pokemon-stats]');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}


const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', 'img/pokemon-img-01.png');
    pokeImg.style.background =  '#fff';
    pokeImg.style.borderRadius = '50px';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}



// async function getPokemonData() {
//       const pokemonName = document.getElementById("pokemonName").value.toLowerCase();

//       try {
//         // Fetch data from the Pokémon API
//         const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
//         const data = response.data;

//         // Update the HTML elements with Pokémon data
//         document.getElementById("frontImage").src = data.sprites.front_default;
//         document.getElementById("backImage").src = data.sprites.back_default;
//         document.getElementById("name").textContent = data.name;
//         document.getElementById("height").textContent = data.height / 10; // Height is in decimetres
//         document.getElementById("weight").textContent = data.weight / 10; // Weight is in hectograms
//         document.getElementById("hp").textContent = data.stats[0].base_stat;
//         document.getElementById("attack").textContent = data.stats[1].base_stat;
//         document.getElementById("defense").textContent = data.stats[2].base_stat;
//         document.getElementById("speed").textContent = data.stats[5].base_stat;
//         document.getElementById("type").textContent = data.types.map(type => type.type.name).join(", ");
//       } catch (error) {
//         console.error("Error fetching Pokémon data:", error);
//         alert("No se encontró ningún Pokémon con ese nombre.");
//       }
//     }
 


// const URL = "https://rickandmortyapi.com/api/character";

// const ulElementCharacters = document.querySelector("ul")

// // Muestra en la consola lo que ha buscado el usuario en el formulario, al hacer click en la lupa de buscar.
// function search() {
//     let searchResult = document.getElementById("searchpokemon").value;
//     console.log(searchResult) }

// // Valida que haya un resultado y muestra la imagen.
//     if (searchResult) {
//         const pokemonImage = document.createElement("img");
//         pokemonImage.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${searchResult}.png`
//         document.body.appen }