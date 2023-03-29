import './App.css';
import { useState } from 'react';

function App() {

let message = "Gotta Catch them all!"

const [ poke, setPoke ] = useState([])

const [ selectPoke, setSelectPoke ] = useState({})

const [ typeSort, setTypeSort ] = useState([])

const [ types, setTypes ] = useState([])

const [ src, setSrc ] = useState("")

function toggleFavorite() {
  console.log("Toggled")
}

function sortType(type) {
  fetch(`https://pokeapi.co/api/v2/type/${type}/`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setTypeSort(data.pokemon);
      setPoke([]);
    })
}

function PokeData() {
  return (
    <>
    <h2>#{selectPoke.id} {selectPoke.name}</h2>
      <img src={src}  alt="pokemon"/>
      <h3>Types</h3>
      <ul>
        {pokeTypes}
      </ul>
      <h3>Height: {selectPoke.height / 10} M</h3>
      <h3>Weight: {selectPoke.weight / 10} KG</h3>
    </>
  )
}

async function getPokemon() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    const data = await res.json()

    setPoke(data.results)

    console.log(poke)

  setTypeSort([]);

}

async function selectPokemon(select) {
    const res = await fetch(select)
    const data = await res.json()

    setSelectPoke(data);

    console.log(selectPoke)

    setSrc(data.sprites.front_default)

    console.log(src)

    setTypes(data.types);

    console.log(types);

   }

function sortFavorites() {
  console.log("Favorites go here")
}

const pokeTypes = types.map((type) => {
  return <li className={type.type.name} key={type.type.name} onClick={() => {
    sortType(type.type.name)}}>{type.type.name}</li>
 })

const pokeList = poke.map((pokemon) => {
  return <li onClick={() => {
    selectPokemon(pokemon.url)
  }} key={pokemon.name}>{pokemon.name}</li>;
})

const typeSortList = typeSort.map((type) => {
  return <li onClick={() => {
    selectPokemon(type.pokemon.url)
  }} key={type.pokemon.name}>{type.pokemon.name}</li>;
})


return (
    <>
    <h1>{message}</h1>
    <div>
      <PokeData />
      <button onClick={toggleFavorite}>Toggle Favorite</button>
      <button onClick={sortFavorites}>Sort Favorites</button>
      <button onClick={getPokemon}>Get Pokemon</button>
    <ul id="pokemon">{pokeList}</ul>
    <ul>{typeSortList}</ul>
    </div>
    </>
  );
}

export default App;
