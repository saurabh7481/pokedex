import Image from "next/image";
import Link from "next/link";

import type { Metadata } from "next";
import Heading from "./_components/ui/Heading";
import Paragraph from "./_components/ui/Paragraph";
import { buttonVariants } from "./_components/ui/Button";

export const metadata: Metadata = {
    title: "Pokedex | Home",
    description: "Free pokemon search",
};

export default function Home() {
    return (
        <div className="relative h-screen flex items-center justify-center overflow-x-hidden">
            <div className="container pt-32 max-w-7xl w-full mx-auto h-full">
                <div className="h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start">
                    <Heading
                        className="text-slate-300 dark:text-light-gold"
                        size={"lg"}
                    >
                        Easily search <br /> pokemons.
                    </Heading>

                    <Paragraph className="max-w-xl lg:text-left">
                        Use this tool to search pokemons with names and types.
                    </Paragraph>

                    <Link
                        href="/search"
                        className={buttonVariants({ variant: "outline" })}
                    >
                        Start Searching
                    </Link>

                    <div className="relative w-full max-w-xl lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute">
                        <Image
                            priority
                            className="img-shadow "
                            quality={60}
                            style={{ objectFit: "contain" }}
                            fill
                            src="/pokemon.jpg"
                            alt="pokemon"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
