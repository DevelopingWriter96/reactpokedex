import './App.css';

let message = "Gotta Catch them all!"

let pokeList = []

function toggleFavorite() {
  console.log("Toggled")
}

async function getPokemon() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    const data = await res.json()

    let poke = data.results

    console.log(poke)

    pokeList = poke.map((pokemon) =>
      <li key={pokemon.name} onClick={selectPokemon(pokemon.url)}>{pokemon.name}</li>
    )
}

async function selectPokemon(select) {
    const res = await fetch(select)
    const data = await res.json()

    let selectedPoke = data;

    console.log(selectedPoke)

    let src = data.sprites.front_default

    console.log(src)

    let types = data.types

    console.log(types);
   }

function sortFavorites() {
  console.log("Favorites go here")
}

function App() {
  return (
    <>
    <h1>{message}</h1>
    <div>
      <h2>#249 Lugia</h2>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png" alt="pokemon"/>
      <h3>Types</h3>
      <ul>
        <li className="psychic">psychic</li>
        <li className="flying">flying</li>
      </ul>
      <h3>Height: 5.2 M</h3>
      <h3>Weight: 216 KG</h3>
      <button onClick={toggleFavorite}>Toggle Favorite</button>
      <button onClick={sortFavorites}>Sort Favorites</button>
      <button onClick={getPokemon}>Get Pokemon</button>
      <select><option>Choose One</option>
    <option value="normal">Normal</option>
    <option value="fire">Fire</option>
    <option value="water">Water</option>
    <option value="grass">Grass</option>
    <option value="electric">Electric</option>
    <option value="ice">Ice</option>
    <option value="fighting">Fighting</option>
    <option value="poison">Poison</option>
    <option value="ground">Ground</option>
    <option value="flying">Flying</option>
    <option value="psychic">Psychic</option>
    <option value="bug">Bug</option>
    <option value="rock">Rock</option>
    <option value="ghost">Ghost</option>
    <option value="dark">Dark</option>
    <option value="dragon">Dragon</option>
    <option value="steel">Steel</option>
    <option value="fairy">Fairy</option></select>
    <ul id="pokemon">
      {pokeList}
    </ul>
    <ul id="type">

    </ul>
    </div>
    </>
  );
}

export default App;
