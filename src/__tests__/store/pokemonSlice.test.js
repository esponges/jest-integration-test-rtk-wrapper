import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { store } from "../../store/mockedStoreWrapper";
import { getPokemonById } from "../../store/pokemonSlice";

const pokemonData = {
  id: 1,
  name: "bulbasaur",
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
};

const mock = new MockAdapter(axios);

const mockNetworkRequests = () => {
  mock.onGet("https://pokeapi.co/api/v2/pokemon/1").reply(200, pokemonData);
};

const unMockNetworkRequests = () => {
  mock.resetHistory();
};

const mockedStore = store();

describe("pokemon slice", () => {
  beforeEach(() => {
    mockNetworkRequests();
  });

  afterEach(() => {
    unMockNetworkRequests();
  });

  it("should fetch a pokemon", async () => {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonData.id}`
    );
    expect(data).toEqual(pokemonData);
  });

  it("should fetch a pokemon with the getPokemonById thunk", async () => {
    await mockedStore.dispatch(getPokemonById(pokemonData.id));
    const { pokemonItems } = mockedStore.getState().pokemon;

    expect(pokemonItems).toEqual([pokemonData]);
  });
});
