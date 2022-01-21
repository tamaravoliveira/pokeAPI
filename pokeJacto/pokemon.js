//API
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

//elements
const getElement = document.querySelector.bind(document);
const searchInput = getElement('.search-input'),
      searchButton = getElement('.search-button'),
      container = getElement('.pokemon'),
      erroMessage = getElement('.error');

var pokeName, //id ou nome da busca.
    pokemon, //guarda dados recebidos da API.
    card; // recebe o HTML.

//faz requisições para a API e insere as respostas na variável pokémon.
async function requestPokeInfo(url, name) {
  await fetch(url + name)
    .then(response => response.json())
    .then(data => {
      pokemon = data;
    })
    .catch(err => console.log(err));
}

//monta o HTML exibido na página.
function createCard () {
  card = `
    <div class="pokemon-picture">
      <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
    </div>
    <div class="pokemon-info">
        <h1 class="name">${pokemon.name}</h1>
        <font class="number">Nº ${pokemon.id} - Type: ${pokemon.types.map(item => item.type.name).toString()}</font>
        <h3 class="weight">Weight: ${pokemon.weight}</h3>
        <h3 class="height">Height: ${pokemon.height}</h3>
    </div>`;
  return card;
}

//chama as funções principais e inicia o app.
async function startApp(pokeName) {
  await requestPokeInfo(baseUrl, pokeName);
      container.innerHTML = createCard();
    }

//add events.
searchButton.addEventListener('click', event => {
  event.preventDefault();
  pokeName = searchInput.value.toLowerCase();
  searchInput.value = '';
  startApp(pokeName);
  container.classList.add('fade');

  //reseta o efeito removendo a classe fade.
  setTimeout(() => {
    container.classList.remove('fade');
  }, 3000);
});