import { FC } from "react";

import type { Metadata } from "next";
import LargeHeading from "@/ui/Heading";
import Paragraph from "@/ui/Paragraph";
import SearchTabs from "@/components/SearchTabs";

export const metadata: Metadata = {
    title: "Search | Pokedex",
    description: "Free pokemon search",
};

interface pageProps {}

const page: FC<pageProps> = ({}) => {
    return (
        <div className="container max-w-7xl mx-auto mt-12">
            <div className="flex flex-col items-center gap-6">
                <LargeHeading>Search Pokemons</LargeHeading>
                <Paragraph>
                    Choose the type of search you want to perform.
                </Paragraph>
                <SearchTabs />
            </div>
        </div>
    );
};

export default page;
