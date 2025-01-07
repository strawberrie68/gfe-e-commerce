import clsx from "clsx"
import { Check } from "lucide-react"

interface ColorSwatchProps {
    inStock: boolean
    selected: boolean
    color: {
        value: string
        label: string
    }
    onClick?: () => void
}

const RotatedLine = () => (
    <div className="absolute inset-0 flex justify-center items-start">
        <div className="w-[2px] h-11 bg-neutral-600 transform rotate-45"></div>
    </div>
);

const ColorSwatch: React.FC<ColorSwatchProps> = ({ inStock, selected, color, onClick }) => {

    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx("min-w-11 min-h-11 relative flex justify-center items-center")}
        >
            {!inStock && <RotatedLine />}
            <div
                style={{ backgroundColor: color.value }}
                className={clsx(
                    "w-[38px] h-[38px] rounded-full flex justify-center items-center",
                    color.value === "#fff" && "border border-gray-200",
                    "hover:border-2 hover:border-indigo-200",
                    "focus:border-6 focus:border-indigo-200",
                    "active:border-2 active:border-white active:ring-1 active:ring-indigo-700 active:ring-offset-indigo-700"
                )}
            >
                {selected && inStock && <Check color="#ffffff" />}
            </div>
        </button>
    )
}

export default ColorSwatch
