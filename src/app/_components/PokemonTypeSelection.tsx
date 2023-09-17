'use client'

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
        const selectedType = value;
        selectType(selectedType === "none" ? undefined : selectedType);
    };

    return (
        <div>
            <label className="dark:text-white text-amber-950">
                Select a Pokemon Type:
            </label>
            <Select onValueChange={handleTypeChange} value={selectedType ?? ""}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type" className="text-white"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup className="overflow-scroll h-60">
                        <SelectLabel>Type</SelectLabel>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="water">Water</SelectItem>
                        <SelectItem value="grass">Grass</SelectItem>
                        <SelectItem value="fire">Fire</SelectItem>
                        <SelectItem value="fighting">Fighting</SelectItem>
                        <SelectItem value="psychic">Psychic</SelectItem>
                        <SelectItem value="bug">Bug</SelectItem>
                        <SelectItem value="electric">Electric</SelectItem>
                        <SelectItem value="ground">Ground</SelectItem>
                        <SelectItem value="poison">Poison</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default PokemonTypeSelection;
