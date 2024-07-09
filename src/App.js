import './App.css';
import { useState } from 'react';

function App() {

let message = "Gotta Catch them all!"

const [ poke, setPoke ] = useState([])

const [ selectPoke, setSelectPoke ] = useState({})

const [ typeSort, setTypeSort ] = useState([])

const [ types, setTypes ] = useState([])

const [ src, setSrc ] = useState("")

const [ favorites, setFavorites ] = useState([])

const [ team, setTeam ] = useState([])

const typeWeaknesses= [
  ["","Normal Defense", "Fire Defense", "Water Defense", "Electric Defense", "Grass Defense", "Ice Defense", "Fighting Defense", "Poison Defense", "Ground Defense", "Flying Defense", "Psychic Defense", "Bug Defense", "Rock Defense", "Ghost Defense", "Dragon Defense", "Dark Defense", "Steel Defense", "Fairy Defense"],
  ["Normal Attack", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, -1, 0],
  ["Fire Attack", 0, -1, -1, 0, 1, 1, 0, 0, 0, 0, 0, 1, -1, 0, -1, 0, 1, 0],
  ["Water Attack", 0, 1, -1, 0, -1, 0, 0, 0, 1, 0, 0, 0, 1, 0, -1, 0, 0, 0],
  ["Electric Attack", 0, 0, 1, -1, -1, 0, 0, 0, -1, 1, 0, 0, 0, 0, -1, 0, 0, 0],
  ["Grass Attack", 0, -1, 1, 0, -1, 0, 0, -1, 1, -1, 0, -1, 1, 0, -1, 0, -1, 0],
  ["Ice Attack", 0, -1, -1, 0, 1, -1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, -1, 0],
  ["Fighting Attack", 1, 0, 0, 0, 0, 1, 0 -1, 0, -1, -1, -1, 1, -1, 0, 2, 2, -1]
]

console.log(typeWeaknesses);

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

    console.log(data.results)

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

function addTeam(pokemon) {

  if (team.length < 6) {

    if (team.find(teamPokemon => teamPokemon === pokemon.name)){
      setTeam(team.filter(teamPokemon => teamPokemon !== pokemon.name))
      console.log(team);
      } else {
      setTeam([...team, {name: pokemon.species.name, url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`, types: [...types]}]);
      console.log(team);
        
      }
    }else{
      console.log("Your team is full!");
    } 
  }

function toggleFavorite(pokemon) {
  console.log(selectPoke);
  if (favorites.find(favoritePokemon => favoritePokemon.name === pokemon.name)){
        setFavorites(favorites.filter(favoritePokemon => favoritePokemon.name !== pokemon.name))
        console.log(favorites);
      } else {
        setFavorites([...favorites, {name: pokemon.species.name, url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`}]);
        console.log(favorites);
      }
  }

function showTeam() {
  setPoke(team);

  setTypeSort([]);
}

function sortFavorites() {
  setPoke(favorites);

  setTypeSort([]);
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
      <button onClick={() => {addTeam(selectPoke)}}>Toggle Team Membership</button>
      <button onClick={() => {toggleFavorite(selectPoke)}}>Toggle Favorite</button>
      <button onClick={showTeam}>Team</button>
      <button onClick={sortFavorites}>Sort Favorites</button>
      <button onClick={getPokemon}>Get Pokemon</button>
    <ul id="pokemon">{pokeList}</ul>
    <ul id="teamweakness"></ul>
    <ul>{typeSortList}</ul>
    </div>
    </>
  );
}

export default App;
