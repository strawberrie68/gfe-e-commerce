import { Plus, Minus } from "lucide-react"

interface InfoToggleProps {
    isVisible: boolean
}

const InfoToggle: React.FC<InfoToggleProps> = ({ isVisible }) => {
    return (
        <button className="min-w-11 min-h-11">
            <div className="flex justify-center items-center w-5 h-5 text-neutral-400 border-2 rounded-full">
                {isVisible ? <Minus size={14} /> : <Plus size={14} />}
            </div>
        </button>
    )
}

export default InfoToggle