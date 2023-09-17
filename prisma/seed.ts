import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    for (let id = 1; id <= 100; id++) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await res.json();
        await prisma.pokemons.create({
            data: {
                name: pokemon.name,
                types: pokemon.types[0].type.name,
                sprite: pokemon.sprites.front_default,
            },
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        await prisma.$disconnect();
        process.exit(1);
    });
