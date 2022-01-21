const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}` //funcão que recebe id como parâmetro e retorna a URL.

const fetchPokemon = () => { //fetch, faz requisições HTTP e devolve dados da URL.

    const pokemonPromises = [] //objeto promise.

    for (let i = 1; i <= 150; i++) { //loop que executa o fetch, obtem resposta e retorna a promise.
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }

    Promise.all(pokemonPromises) //método array de promises.
        .then(pokemons => {

            //reduzindo array em string (template HTML).
            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)
                
                //accumulator mostrando o card com as informações.
                accumulator += ` 
                    <li class="card ${types[0]}">
                    <img class="card-image" alt="${pokemon.name}" src="${pokemon.sprites.front_default}"/>
                    <h2 class="card-title"><b>${pokemon.id}</b>. ${pokemon.name}</h2>
                    <p class="card-subtitle">${types.join(' | ')}</p>
                    </li>
                `
                return accumulator
            }, '') //começa vazio.

            const ul = document.querySelector('[data-js="pokedex"]') //ul pokedex do template HTML.

            ul.innerHTML = lisPokemons //lis inseridas na ul.
        })
}

fetchPokemon()