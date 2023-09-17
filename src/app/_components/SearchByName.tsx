"use client";

import { FC, useState } from "react";
import { api } from "@/app/_trpc/client";
import PokemonCard from "@/app/_components/PokemonCard";

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
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Pokemon name"
                    value={pokemonName}
                    onChange={(e) => setPokemonName(e.target.value)}
                />
                <button type="submit">Get Pokemon</button>
            </form>
            {data?.id && (
                <>
                    {!isLoading ? (
                        <PokemonCard
                            name={data.name}
                            type={data.types.split(",")[0]}
                            image={data.sprite}
                        />
                    ) : (
                        <p>Loading....</p>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchByName;
