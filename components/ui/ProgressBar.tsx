import clsx from "clsx"

interface ProgressBar {
    color: string,
    width: number
}

const ProgressBar: React.FC<ProgressBar> = ({ color, width }) => {
    return (
        <div className="min-w-[117px] md:w-full lg:min-w-[142px] h-2 bg-gray-200 rounded-lg ">
            <div className={clsx(
                `h-2 rounded-lg`,
            )}
                style={{
                    backgroundColor: color,
                    width: `${width}%`,
                }}
            >
            </div>
        </div>)
}

export default ProgressBar