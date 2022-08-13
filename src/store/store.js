import { configureStore } from '@reduxjs/toolkit';

import pokemonReducer from './pokemonSlice';

export const rootReducer = {
    pokemon: pokemonReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});
