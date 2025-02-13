import clsx from "clsx"


interface ToastProps {
    type: string,
    message: string
}

const Toast: React.FC<ToastProps> = ({ type, message }) => {
    const badge = (
        <div className={clsx(
            "flex items-center",
            "px-2.5 py-0.5",
            "bg-white",
            "rounded-full",
            "text-sm font-medium",
            "shadow",
            type === 'error' && 'text-red-800',
            type === 'success' && 'text-green-700',
        )}>
            {type === 'error' ? 'Error' : 'Success'}
        </div>
    )

    return (
        <div className={clsx(
            "mx-4 md:mx-auto md:w-max",
            "flex items-center gap-3",
            "p-1 pr-2.5",
            "rounded-full",
            "text-sm font-medium",
            type === "success" && "bg-green-50 text-green-700",
            type === "error" && "bg-red-50 text-red-600",
        )}>
            {badge}
            <span>{message}</span>
        </div>
    )
}

export default Toast