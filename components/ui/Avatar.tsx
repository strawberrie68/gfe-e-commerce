import Image from "next/image"
import clsx from "clsx"
import { getUserInitial } from "../review/utils"

interface AvatarProps {
    image?: string | null,
    name: string
}

const Avatar: React.FC<AvatarProps> = ({ image, name }) => {
    const nameInitial = name ? getUserInitial(name) : ""

    return (
        <div className={clsx(
            "w-12 h-12 border rounded-full overflow-hidden",
            "flex justify-center"
        )}>
            {image ?
                <Image src={image} alt={`${name} Avatar`} width={48} height={48} className="object-cover" />
                :
                <div className={clsx(
                    "bg-neutral-200",
                    "w-full",
                    "flex justify-center items-center"
                )}>
                    <span className="font-medium text-xl text-center text-neutral-600">{nameInitial}</span>
                </div>
            }

        </div>
    )
}

export default Avatar