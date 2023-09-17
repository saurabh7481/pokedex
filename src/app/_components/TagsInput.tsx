import { type FC, useState } from "react";

interface TagsInputPros {
    selectedTags: (tags: Array<string>) => void;
}

const TagsInput: FC<TagsInputPros> = ({ selectedTags }) => {
    const [tags, setTags] = useState<Array<string>>([]);

    const removeTags = (indexToRemove: number) => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
        selectedTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };

    const addTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        if (value !== "") {
            setTags([...tags, value]);
            selectedTags([...tags, value]);
            (event.target as HTMLInputElement).value = "";
        }
    };

    return (
        <div className="flex items-start flex-wrap min-h-48 w-480 px-8 border border-gray-300 rounded-md focus-within:border-blue-500">
            <ul className="flex flex-wrap p-0 mt-8">
                {tags.map((tag, index) => (
                    <li
                        key={index}
                        className="w-auto h-8 flex items-center justify-center text-white px-4 text-sm leading-none rounded-md mr-8 bg-blue-600"
                    >
                        <span className="mt-3">{tag}</span>
                        <span
                            className="block w-4 h-4 leading-16 text-center text-14 ml-8 text-blue-500 rounded-full bg-white cursor-pointer"
                            onClick={() => removeTags(index)}
                        >
                            x
                        </span>
                    </li>
                ))}
            </ul>
            <input
                className="flex-1 border-none h-46 text-base pt-4 focus:outline-none"
                type="text"
                onKeyUp={(event) =>
                    event.key === "Enter" ? addTags(event) : null
                }
                placeholder="Press enter to add tags"
            />
        </div>
    );
};

export default TagsInput;
