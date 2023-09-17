import TagsInput from "@/components/TagsInput";
import { useState } from "react";
import { api } from "../_trpc/client";
import PokemonCard from "@/components/PokemonCard";
import Paragraph from "./ui/Paragraph";

const SearchByMultiName = () => {
    const [names, setNames] = useState<Array<string>>([]);
    const selectedTags = (tags: Array<string>) => {
        setNames(tags);
        refetch();
    };

    const { data, isInitialLoading, isError, refetch } =
        api.pokemons.getByNameMultiple.useQuery(
            {
                names,
            },
            {
                enabled: names.length ? true : false,
            }
        );

    return (
        <div>
            <TagsInput
                selectedTags={selectedTags}
                placeholder={
                    "Type pokemon name and press enter. Ex - Butterfree"
                }
            />
            <div className="md:grid md:grid-cols-2 gap-4">
                {data && data?.length > 0 && (
                    <>
                        {data.map((d) => (
                            <PokemonCard
                                key={d.id}
                                name={d.name}
                                types={d.types}
                                image={d.sprite}
                            />
                        ))}
                    </>
                )}
            </div>
            {isInitialLoading && <Paragraph>Loading......</Paragraph>}
            {isError && <Paragraph>{"Something went wrong :/"}</Paragraph>}
        </div>
    );
};

export default SearchByMultiName;
