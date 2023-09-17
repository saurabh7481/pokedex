import { type FC, useState, ChangeEvent, KeyboardEvent } from "react";
import { Input } from "./ui/Input";

interface TagsInputProps {
    selectedTags: (tags: Array<string>) => void;
    placeholder: string;
}

const TagsInput: FC<TagsInputProps> = ({ selectedTags, placeholder }) => {
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            // Prevent duplicate tags
            if (!tags.includes(inputValue)) {
                setTags([...tags, inputValue]);
                setInputValue("");
                selectedTags([...tags, inputValue]);
            }
        } else if (
            e.key === "Backspace" &&
            inputValue === "" &&
            tags.length > 0
        ) {
            // Remove the last tag when pressing backspace with an empty input field
            const newTags = [...tags];
            newTags.pop();
            setTags(newTags);
            selectedTags(newTags);
        }
    };

    const handleTagRemove = (tagToRemove: string) => {
        const newTags = tags.filter((tag) => tag !== tagToRemove);
        setTags(newTags);
        selectedTags(newTags);
    };

    return (
        <div className="w-full mx-auto my-4 p-2 rounded-md shadow-md">
            <Input
                type="text"
                className="w-full px-2 py-1 border border-gray-300 rounded-md mt-2"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
            />
            <div className="mt-2 flex flex-wrap items-center">
                {tags.map((tag, index) => (
                    <div
                        key={index}
                        className="bg-blue-500 dark:bg-slate-300 text-white px-2 py-1 m-1 rounded-md flex items-center gap-2"
                    >
                        <span className="mr-1 dark:text-black">{tag}</span>
                        <button
                            className="text-red-500 focus:outline-none"
                            onClick={() => handleTagRemove(tag)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagsInput;
