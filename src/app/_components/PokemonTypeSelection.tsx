import React from "react";

type PokemonTypeSelectionProps = {
    selectedType: string | undefined;
    selectType: (type: string | undefined) => void;
};

const PokemonTypeSelection: React.FC<PokemonTypeSelectionProps> = ({
    selectedType,
    selectType,
}) => {
    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;
        selectType(selectedType === "none" ? undefined : selectedType);
    };

    return (
        <div>
            <label htmlFor="typeSelect">Select a Pokemon Type:</label>
            <select
                id="typeSelect"
                onChange={handleTypeChange}
                value={selectedType || "none"}
            >
                <option value="none">-- Select Type --</option>
                <option value="fire">Fire</option>
                <option value="water">Water</option>
                <option value="grass">Grass</option>
            </select>
        </div>
    );
};

export default PokemonTypeSelection;
