import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonById } from "./store/pokemonSlice";

function App({ id = null }) {
  const dispatch = useDispatch();
  const latestPokemon = useSelector((state) => {
    const { pokemonItems } = state.pokemon;

    if (pokemonItems?.length > 0) {
      return pokemonItems[pokemonItems.length - 1];
    }
    return null;
  });

  const handleRandomPokemonFetch = () => {
    const randomNumber = Math.floor(Math.random() * Math.floor(100));
    dispatch(getPokemonById(id || randomNumber));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>Fetch your random pokemon!</h3>
        <button onClick={handleRandomPokemonFetch}>Fetch Random Pokemon</button>
        {latestPokemon && (
          <div data-testid="pokemon-container">
            <h3>{latestPokemon.name}</h3>
            <img
              src={latestPokemon.sprites.front_default}
              alt={latestPokemon.name}
            />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
