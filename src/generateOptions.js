import { pokemonStarters } from "./options.js";

export default function generateOptions(allPokemon) {
    return allPokemon.map((pokemon) => {
        return {
            value: pokemon,
            label: `${pokemon} (${pokemonStarters[pokemon]})`,
        };
    });
};