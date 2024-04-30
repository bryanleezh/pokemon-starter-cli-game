import * as p from '@clack/prompts';
import {setTimeout } from "node:timers/promises";
import fetch from "node-fetch";

// generate options to show on CLI
const generateOptions = (allPokemon) => {
    return allPokemon.map((pokemon) => {
        return {
            value: pokemon,
            // TODO: Change value later
            label: pokemon,
        };
    });
};

const pokemonKeys = [
  "Bulbasaur",
  "Charmander",
  "Squirtle",
  "Pikachu",
  "Chikorita",
  "Cyndaquil",
  "Totodile",
  "Treecko",
  "Torchic",
  "Mudkip",
  "Turtwig",
  "Chimchar",
  "Piplup",
  "Snivy",
  "Tepig",
  "Oshawott",
  "Chespin",
  "Froakie",
  "Fennekin",
  "Rowlet",
  "Popplio",
  "Litten",
  "Grookey",
  "Sobble",
  "Scorbunny",
  "Sprigatito",
  "Quaxly",
  "Fuecoco"
];


const pokemonStarters = {
    // Gen 1
    "Bulbasaur": "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.",
    "Charmander": "Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.",
    "Squirtle": "After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.",
    "Pikachu": "When several of these Pokémon gather, their electricity could build and cause lightning storms.",
    // Gen 2
    "Chikorita": "A sweet aroma gently wafts from the leaf on its head. It is docile and loves to soak up sunrays.",
    "Cyndaquil": "It is timid, and always curls itself up in a ball. If attacked, it flares up its back for protection.",
    "Totodile": "Its well-developed jaws are powerful and capable of crushing anything. Even its trainer must be careful.",
    // Gen 3
    "Treecko": "It agilely leaps about the jungle and uses the sharp leaves on its arms to strike down foes.",
    "Torchic": "A fire burns inside, so it feels very warm to hug. It launches fireballs of 1,800 degrees Fahrenheit.",
    "Mudkip": "The fin on Mudkip's head acts as highly sensitive radar. Using this fin to sense movements of water and air, this Pokémon can determine what is taking place around it without using its eyes.",
    // Gen 4
    "Turtwig": "It undertakes photosynthesis with its body, making oxygen. The leaf on its head wilts if it is thirsty.",
    "Chimchar": "It agilely scales sheer cliffs to live atop craggy mountains. Its fire is put out when it sleeps.",
    "Piplup": "Because it is very proud, it hates accepting food from people. Its thick down guards it from cold.",
    // Gen 5
    "Snivy": "They photosynthesize by bathing their tails in sunlight. When they are not feeling well, their tails droop.",
    "Tepig": "It blows fire through its nose. When it catches a cold, the fire becomes pitch-black smoke instead.",
    "Oshawott": "It fights using the scalchop on its stomach. In response to an attack, it retaliates immediately by slashing.",
    // Gen 6
    "Chespin": "The quills on its head are usually soft. When it flexes them, the points become so hard and sharp that they can pierce rock.",
    "Froakie": "It secretes flexible bubbles from its chest and back. The bubbles reduce the damage it would otherwise take when attacked.",
    "Fennekin": "As it walks, it munches on a twig in place of a snack. It intimidates opponents by puffing hot air out of its ears.",
    // Gen 7
    "Rowlet": "It sends its feathers, which are as sharp as blades, flying in attack. Its visual abilities are impressive.",
    "Popplio": "Popplio can snort bubbles from its nose to create a variety of balloons. The balloons it creates will then explode when touched.",
    "Litten": "While grooming itself, it builds up fur inside its stomach. It sets the fur alight and spews fiery attacks, which change based on how it coughs.",
    // Gen 8
    "Grookey": "When it uses its special stick to strike up a beat, the sound waves produced carry revitalizing energy to the plants and flowers in the area.",
    "Sobble": "When it feels threatened, it spills a glowing chemical from its body that it can use to escape.",
    "Scorbunny": "It has special pads on the backs of its feet, and one on its nose. Once it's warmed up, its fire power increases.",
    // Gen 9
    "Sprigatito": "It's brimming with curiosity about things it's never seen before. The red flower on its head releases a sweet fragrance when it feels calm and happy.",
    "Quaxly": "This Pokémon is known for its devotion to its trainer, and also for its superior speed in water. It's a natural swimmer.",
    "Fuecoco": "A Pokémon that's always warm to the touch. It emits a warm light, which lures in its prey.",
};

async function main() {
    console.clear();

    await setTimeout(400);

    p.intro("Welcome to the Pokemon Starter CLI game");
    
    const game = await p.group(
        {
            rules: () =>
                p.note(
                    "Choose your favourite starter from each region in several rounds of match ups!",
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

        const finalData = {
            Bulbasaur: 0,
            Charmander: 0,
            Squirtle: 0,
            Pikachu: 0,
            Chikorita: 0,
            Cyndaquil: 0,
            Totodile: 0,
            Treecko: 0,
            Torchic: 0,
            Mudkip: 0,
            Turtwig: 0,
            Chimchar: 0,
            Piplup: 0,
            Snivy: 0,
            Tepig: 0,
            Oshawott: 0,
            Chespin: 0,
            Froakie: 0,
            Fennekin: 0,
            Rowlet: 0,
            Popplio: 0,
            Litten: 0,
            Grookey: 0,
            Sobble: 0,
            Scorbunny: 0,
            Sprigatito: 0,
            Quaxly: 0,
            Fuecoco: 0
        };

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

        console.log(finalData);
        // TODO: Add to database and get from database all data from users
        s.start("Submitting your starter choices...");
        await setTimeout(1000);
        s.stop();
    }

    p.outro(`Thanks for playing!`);

}

main().catch(console.error);