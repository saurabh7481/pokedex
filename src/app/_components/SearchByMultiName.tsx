import TagsInput from "@/components/TagsInput";
import { useState } from "react";
import { api } from "../_trpc/client";
import PokemonCard from "@/components/PokemonCard";

const SearchByMultiName = () => {
    const [names, setNames] = useState<Array<string>>([]);
    const selectedTags = (tags: Array<string>) => {
        setNames(tags);
    };

    const { data, isLoading, isError } =
        api.pokemons.getByNameMultiple.useQuery({
            names,
        });

    return (
        <div>
            <TagsInput selectedTags={selectedTags} />
            {data?.length ? (
                <>
                    {!isLoading ? (
                        data.map((d) => (
                            <PokemonCard
                                key={d.id}
                                name={d.name}
                                types={d.types}
                                image={d.sprite}
                            />
                        ))
                    ) : (
                        <p>Loading....</p>
                    )}
                </>
            ) : (
                "No pokemon chosen"
            )}
        </div>
    );
};

export default SearchByMultiName;
