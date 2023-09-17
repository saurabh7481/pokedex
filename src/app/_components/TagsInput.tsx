import { type FC, useState } from "react";
import { Input } from "./ui/Input";

interface TagsInputProps {
    selectedTags: (tags: Array<string>) => void;
}

// const TagsInput: FC<TagsInputPros> = ({ selectedTags }) => {
//     const [tags, setTags] = useState<Array<string>>([]);

//     const removeTags = (indexToRemove: number) => {
//         setTags([...tags.filter((_, index) => index !== indexToRemove)]);
//         selectedTags([...tags.filter((_, index) => index !== indexToRemove)]);
//     };

//     const addTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
//         const value = (event.target as HTMLInputElement).value;
//         if (value !== "") {
//             setTags([...tags, value]);
//             selectedTags([...tags, value]);
//             (event.target as HTMLInputElement).value = "";
//         }
//     };

//     return (
//         <div className="flex items-start flex-wrap min-h-48 w-480 px-8 border border-gray-300 rounded-md focus-within:border-blue-500">
//             <ul className="flex flex-wrap p-0 mt-8">
//                 {tags.map((tag, index) => (
//                     <li
//                         key={index}
//                         className="w-auto h-8 flex items-center justify-center text-white px-4 text-sm leading-none rounded-md mr-8 bg-blue-600"
//                     >
//                         <span className="mt-3">{tag}</span>
//                         <span
//                             className="block w-4 h-4 leading-16 text-center text-14 ml-8 text-blue-500 rounded-full bg-white cursor-pointer"
//                             onClick={() => removeTags(index)}
//                         >
//                             x
//                         </span>
//                     </li>
//                 ))}
//             </ul>
//             <Input
//                 className="flex-1 border-none h-46 text-base pt-4 focus:outline-none"
//                 type="text"
//                 onKeyUp={(event) =>
//                     event.key === "Enter" ? addTags(event) : null
//                 }
//                 placeholder="Press enter to add tags"
//             />
//         </div>
//     );
// };

const TagsInput: FC<TagsInputProps> = ({ selectedTags }) => {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e) => {
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

    const handleTagRemove = (tagToRemove) => {
        const newTags = tags.filter((tag) => tag !== tagToRemove);
        setTags(newTags);
        selectedTags(newTags);
    };

    return (
        <div className="w-full mx-auto my-4 p-2 rounded-md shadow-md">
            <Input
                type="text"
                className="w-full px-2 py-1 border border-gray-300 rounded-md mt-2"
                placeholder="Enter hobbies..."
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
