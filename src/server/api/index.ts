import { z } from "zod";

import { publicProcedure, createTRPCRouter } from "./trpc";
import { pokemonRouter } from "./routes/pokemon";

export const appRouter = createTRPCRouter({
    pokemons: pokemonRouter,
});

export type AppRouter = typeof appRouter;
