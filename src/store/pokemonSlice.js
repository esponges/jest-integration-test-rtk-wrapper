import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    pokemonItems: [],
    loading: false,
    error: null,
};

export const getPokemonById = createAsyncThunk(
    'pokemon/getPokemonById',
    async (id, thunkAPI) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await response.json();
        return pokemon;
    }
);

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPokemonById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getPokemonById.fulfilled, (state, action) => {
            state.loading = false;
            state.pokemonItems.push(action.payload);
        });
        builder.addCase(getPokemonById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    }
});


export default pokemonSlice.reducer;
