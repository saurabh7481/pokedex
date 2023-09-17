import Image from "next/image";
import { FC } from "react";
import Heading from "./ui/Heading";
import Paragraph from "./ui/Paragraph";

interface PokemonCardProps {
    name: string;
    image: string;
    types: string;
}

const PokemonCard: FC<PokemonCardProps> = ({ image, name, types }) => {
    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg">
            <Image
                src={image}
                alt="Image"
                className="w-full"
                height={100}
                width={100}
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                    <Heading size={"sm"} className="pb-4">
                        {name.toUpperCase()}
                    </Heading>
                </div>
                <Paragraph className="text-gray-700 text-base">
                    Type : {types.toUpperCase()}
                </Paragraph>
            </div>
        </div>
    );
};

export default PokemonCard;
