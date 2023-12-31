"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import superjson from "superjson";

import { api } from "./client";

export default function Provider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient({}));
    const [trpcClient] = useState(() =>
        api.createClient({
            transformer: superjson,
            links: [
                httpBatchLink({
                    url:
                        process.env.NODE_ENV === "development"
                            ? "http://localhost:3000/api/trpc"
                            : process.env.VERCEL_TRPC_URL ||
                              "https://pokedex-eight-red.vercel.app/api/trpc",
                }),
            ],
        })
    );
    return (
        <api.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </api.Provider>
    );
}
