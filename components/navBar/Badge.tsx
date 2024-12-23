type BadgeProps = {
    count: number;
};

const Badge: React.FC<BadgeProps> = ({ count }) => {
    if (count <= 0) return null;
    return (
        <div
            role="badge"
            className="absolute right-2 top-0 text-white bg-indigo-700 w-[18px] h-[18px] rounded-full flex justify-center text-[12px]"
        >
            {count}
        </div>
    );
};


export default Badge;