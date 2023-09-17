"use client";

import { FC, useState } from "react";
import { api } from "@/app/_trpc/client";
import PokemonCard from "@/app/_components/PokemonCard";
import { Input } from "./ui/Input";
import Button from "./ui/Button";
import Paragraph from "./ui/Paragraph";
import { Loader2Icon } from "lucide-react";

const SearchByName = () => {
    const [pokemonName, setPokemonName] = useState("");
    const [searchPhrase, setSearchPhrase] = useState("");
    const { data, isInitialLoading, isError } = api.pokemons.getByName.useQuery(
        {
            name: searchPhrase,
        },
        {
            enabled: !!searchPhrase,
        }
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchPhrase(pokemonName);
    };

    if (isError) {
        return <p>Something went wrong..</p>;
    }

    return (
        <>
            <div>
                <form onSubmit={handleSubmit} className="flex gap-2 pb-10">
                    <Input
                        type="text"
                        placeholder="Enter Pokemon name"
                        value={pokemonName}
                        onChange={(e) => setPokemonName(e.target.value)}
                    />
                    <Button type="submit">
                        {isInitialLoading ? (
                            <Loader2Icon className="animate-spin" />
                        ) : (
                            "Search"
                        )}
                    </Button>
                </form>
            </div>
            <div className="md:grid md:grid-cols-2 gap-4">
                {data && data.id && (
                    <>
                        <PokemonCard
                            name={data.name}
                            types={data.types}
                            image={data.sprite}
                        />
                    </>
                )}
            </div>
            {isInitialLoading && <Paragraph>Loading......</Paragraph>}
            {isError && <Paragraph>{"Something went wrong :/"}</Paragraph>}
        </>
    );
};

export default SearchByName;
