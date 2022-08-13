import axios from "axios";
import "@testing-library/jest-dom";
import { fireEvent, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import { store, screen, render } from "../../store/mockedStoreWrapper";
import { getPokemonById } from "../../store/pokemonSlice";

import App from "../../App";

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
const initialState = {};

describe("pokemon slice", () => {
  beforeEach(() => {
    mockNetworkRequests();
  });

  afterEach(() => {
    unMockNetworkRequests();
  });

  /* api */
  it("should fetch a pokemon", async () => {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonData.id}`
    );
    expect(data).toEqual(pokemonData);
  });

  /* thunk */
  it("should fetch a pokemon with the getPokemonById thunk", async () => {
    await mockedStore.dispatch(getPokemonById(pokemonData.id));
    const { pokemonItems } = mockedStore.getState().pokemon;

    expect(pokemonItems).toEqual([pokemonData]);
  });

  /* component */
  it("should render the app with the initialState", () => {
    render(<App />, initialState);

    // no pokemon in the state
    const pokemonContainer = screen.queryByTestId("pokemon-container");
    expect(pokemonContainer).not.toBeInTheDocument();
  });

  // not really fetched yet
  it("should render the app with the latest pokemon", () => {
    // provide an initialState with a pokemon
    // we don't really fetch the pokemon, just use the data we have
    render(<App />, {
      initialState: {
        pokemon: {
          pokemonItems: [pokemonData],
        },
      },
    });

    // pokemon in the state
    const pokemonName = screen.getByText(pokemonData.name);
    expect(pokemonName).toBeInTheDocument();
  });

  // lets fetch a pokemon as an user would do
  it("should render the app with the fetched latest pokemon", async () => {
    // arrange
    render(<App id={pokemonData.id} />, {});
    
    // act
    // click the button
    const button = screen.getByText("Fetch Random Pokemon");
    fireEvent.click(button);

    // assert
    // wait for the request to finish
    await waitFor(() => {
      // pokemon in the state
      const pokemonName = screen.getByText(pokemonData.name);
      // screen.debug(); // uncomment this to see the DOM in the console
      expect(pokemonName).toBeInTheDocument();
    });
  });
});
