"use client";

import { FC, useState } from "react";
import { api } from "@/app/_trpc/client";
import PokemonCard from "@/app/_components/PokemonCard";
import { Input } from "./ui/Input";
import Button from "./ui/Button";

const SearchByName = () => {
    const [pokemonName, setPokemonName] = useState("");
    const [searchPhrase, setSearchPhrase] = useState("");
    const { data, isLoading, isError } = api.pokemons.getByName.useQuery({
        name: searchPhrase,
    });

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
                    <Button type="submit">Search</Button>
                </form>
            </div>
            {data?.id && (
                <>
                    {!isLoading ? (
                        <PokemonCard
                            name={data.name}
                            types={data.types}
                            image={data.sprite}
                        />
                    ) : (
                        <p>Loading....</p>
                    )}
                </>
            )}
        </>
    );
};

export default SearchByName;
