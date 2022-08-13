import './App.css';
import { useDispatch } from 'react-redux';
import { getPokemonById } from './store/pokemonSlice';

function App() {
  const dispatch = useDispatch();
  
  const handleRandomPokemonFetch = () => {
    const randomNumber = Math.floor(Math.random() * Math.floor(100));
    dispatch(getPokemonById(randomNumber));
  }
    

  return (
    <div className="App">
      <header className="App-header">
        <h3>
          Fetch your random pokemon!
        </h3>
        <button onClick={handleRandomPokemonFetch}>
          Fetch Random Pokemon
        </button>
      </header>
    </div>
  );
}

export default App;
