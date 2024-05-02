#!/usr/bin/env node

import * as p from '@clack/prompts';
import {setTimeout } from "node:timers/promises";
import fetch from "node-fetch";
import generateOptions from './generateOptions.js';
import { pokemonKeys } from './options.js';

async function main() {
    console.clear();

    await setTimeout(400);

    p.intro("Welcome to the Pokemon Starter CLI game");
    
    const game = await p.group(
        {
            rules: () =>
                p.note(
                    "Choose your favourite starter from each generation in several rounds of match ups!",
                    "Game Rules",
                ),
            // Round 1
            round1_gen1: ({ results }) =>
                p.select({
                    message: "Gen1: Who would you choose?",
                    options: generateOptions([pokemonKeys[0], pokemonKeys[1],  pokemonKeys[2], pokemonKeys[3]]),
                }),
            round1_gen2: ({ results }) =>
                p.select({
                    message: "Gen2: Who would you choose?",
                    options: generateOptions([pokemonKeys[4], pokemonKeys[5],  pokemonKeys[6]]),
                }),
            round1_gen3: ({ results }) =>
                p.select({
                    message: "Gen3: Who would you choose?",
                    options: generateOptions([pokemonKeys[7], pokemonKeys[8],  pokemonKeys[9]]),
                }),
            round1_gen4: ({ results }) =>
                p.select({
                    message: "Gen4: Who would you choose?",
                    options: generateOptions([pokemonKeys[10], pokemonKeys[11],  pokemonKeys[12]]),
                }),
            round1_gen5: ({ results }) =>
                p.select({
                    message: "Gen5: Who would you choose?",
                    options: generateOptions([pokemonKeys[13], pokemonKeys[14],  pokemonKeys[15]]),
                }),
            round1_gen6: ({ results }) =>
                p.select({
                    message: "Gen6: Who would you choose?",
                    options: generateOptions([pokemonKeys[16], pokemonKeys[17],  pokemonKeys[18]]),
                }),
            round1_gen7: ({ results }) =>
                p.select({
                    message: "Gen7: Who would you choose?",
                    options: generateOptions([pokemonKeys[19], pokemonKeys[20],  pokemonKeys[21]]),
                }),
            round1_gen8: ({ results }) =>
                p.select({
                    message: "Gen8: Who would you choose?",
                    options: generateOptions([pokemonKeys[22], pokemonKeys[23],  pokemonKeys[24]]),
                }),
            round1_gen9: ({ results }) =>
                p.select({
                    message: "Gen9: Who would you choose?",
                    options: generateOptions([pokemonKeys[25], pokemonKeys[26],  pokemonKeys[27]]),
                }),
            // results of round 1
            nextRound2: ({ results }) =>
                p.note([
                    results.round1_gen1,
                    results.round1_gen2,
                    results.round1_gen3,
                    results.round1_gen4,
                    results.round1_gen5,
                    results.round1_gen6,
                    results.round1_gen7,
                    results.round1_gen8,
                    results.round1_gen9
                ].join("\n"),
            "Advancing to Round 2"
            ),
            // Round 2
            round2_1:  ({ results }) =>
                p.select({
                    message: "Round 2: Which starter would you choose now?",
                    options: generateOptions([results.round1_gen1, results.round1_gen4, results.round1_gen6]),
                }),
            round2_2:  ({ results }) =>
                p.select({
                    message: "Round 2: Which starter would you choose now?",
                    options: generateOptions([results.round1_gen3, results.round1_gen7, results.round1_gen9]),
                }),
            round2_3:  ({ results }) =>
                p.select({
                    message: "Round 2: Which starter would you choose now?",
                    options: generateOptions([results.round1_gen2, results.round1_gen5, results.round1_gen8]),
                }),
            round2_results: ({ results }) =>
                p.note(
                    [
                        results.round2_1,
                        results.round2_2,
                        results.round2_3,
                    ].join("\n"),
                    "Advancing to the Final Round!"
                ),
            finalRound: ({ results }) => 
                p.select({
                    message: "Final Round. Who will be your favourite?",
                    options: generateOptions([results.round2_1, results.round2_2, results.round2_3,])
                }),
            finalResult: ({ results }) =>
                p.note(`Great! Your final starter is ${results.finalRound}!`, "Your Starter")
        },
        {
            onCancel: () => {
                p.cancel("Game cancelled.");
                process.exit(0);
            },
        }
    );
    
    
    // if game finish executing
    if (game.finalRound) {
        const s = p.spinner();

        const finalData = {};

        const choices = {
            1: [
                game.round1_gen1,
                game.round1_gen2,
                game.round1_gen3,
                game.round1_gen4,
                game.round1_gen5,
                game.round1_gen6,
                game.round1_gen7,
                game.round1_gen8,
                game.round1_gen9
            ],
            2: [
                game.round2_1,
                game.round2_2,
                game.round2_3,
            ],
            3: [game.finalRound],
        };

        // Loop through each key which is considered 1 point, and add it to the data
        for (const [key, pokemons] of Object.entries(choices)) {
            for (const pokemon of pokemons) {
                finalData[pokemon] = parseInt(key);
            }
        }

        // add to database and get from database all data from users
        await fetch("https://bryan-pokemon-server.vercel.app/api/addStartersEntry.json", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalData),
        });
        s.start("Submitting your starter choices...");
        await setTimeout(2000);

        // fetch the current stats
        const totalStats = await fetch("https://bryan-pokemon-server.vercel.app/api/getAllStarters.json");
        await setTimeout(2000);

        p.note(await totalStats.json(), "Worldwide Stats:")
        s.stop();
    }

    p.outro(`Thanks for playing!`);

}

main().catch(console.error);