"use client";

import { FC, ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import Provider from "../_trpc/provider";

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Provider>{children}</Provider>
        </ThemeProvider>
    );
};

export default Providers;
