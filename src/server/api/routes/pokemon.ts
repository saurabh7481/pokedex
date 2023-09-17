import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const pokemonRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.pokemons.findMany();
    }),

    getByName: publicProcedure
        .input(
            z.object({
                name: z.string(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.db.pokemons.findFirst({
                where: {
                    name: input.name,
                },
            });
        }),

    getByNameMultiple: publicProcedure
        .input(
            z.object({
                names: z.array(z.string()),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.db.pokemons.findMany({
                where: {
                    name: {
                        in: input.names,
                    },
                },
            });
        }),

    getByType: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(10).nullish(),
                cursor: z.number().nullish(),
                type: z.string().nullish(),
            })
        )
        .query(async ({ ctx, input }) => {
            const limit = input.limit ?? 10;
            const cursor = input.cursor;

            const pokemons = await ctx.db.pokemons.findMany({
                take: limit + 1,
                where: {
                    types: input.type ?? "",
                },
                cursor: cursor ? { id: cursor } : undefined,
            });

            let nextCursor: typeof cursor | undefined = undefined;
            if (pokemons.length > limit) {
                const nextItem = pokemons.pop();
                nextCursor = nextItem?.id;
            }

            return {
                pokemons,
                nextCursor,
                type: input.type,
            };
        }),
});
