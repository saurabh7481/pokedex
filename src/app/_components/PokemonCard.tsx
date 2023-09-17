import Image from "next/image";
import { FC } from "react";

interface PokemonCardProps {
    name: string;
    image: string;
    type: string;
}

const PokemonCard: FC<PokemonCardProps> = ({ image, name, type }) => {
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
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-700 text-base">Type : {type}</p>
            </div>
        </div>
    );
};

export default PokemonCard;
