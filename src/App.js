import './App.css';

let message = "Gotta Catch them all!"

function App() {
  return (
    <body>
    <h1>{message}</h1>
    <div>
      <h2>#249 Lugia</h2>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png" alt="pokemon"/>
      <h3>Types</h3>
      <ul>
        <li class="psychic">psychic</li>
        <li class="flying">flying</li>
      </ul>
      <h3>Height: 5.2 M</h3>
      <h3>Weight: 216 KG</h3>
    </div>
    </body>
  );
}

export default App;
