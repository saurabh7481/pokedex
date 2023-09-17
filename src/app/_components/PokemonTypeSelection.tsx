import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/Select";

type PokemonTypeSelectionProps = {
    selectedType: string | undefined;
    selectType: (type: string | undefined) => void;
};

const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({
    selectedType,
    selectType,
}) => {
    const handleTypeChange = (value: string) => {
        console.log(value)
        const selectedType = value;
        selectType(selectedType === "none" ? undefined : selectedType);
    };

    return (
        <div>
            <label className="pb-5">Select a Pokemon Type:</label>
            <Select onValueChange={handleTypeChange} value={selectedType ?? ""}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        <SelectItem value="fire">Fire</SelectItem>
                        <SelectItem value="water">Water</SelectItem>
                        <SelectItem value="grass">Grass</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default PokemonTypeSelection;
