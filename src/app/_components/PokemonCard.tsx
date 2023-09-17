import Image from "next/image";
import { FC } from "react";

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
                // className="w-full"
                height={40}
                width={35}
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                    {name.toUpperCase()}
                </div>
                <p className="text-gray-700 text-base">
                    Type : {types.toUpperCase()}
                </p>
            </div>
        </div>
    );
};

export default PokemonCard;
