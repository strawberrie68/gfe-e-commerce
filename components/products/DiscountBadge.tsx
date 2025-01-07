export enum DiscountBadgeType {
    PERCENTAGE = "PERCENTAGE",
    DOLLAR = "DOLLAR"
}

interface DiscountBadgeProps {
    type: DiscountBadgeType;
    amount: number
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ type, amount }) => {
    const isPercentage = type === DiscountBadgeType.PERCENTAGE;

    return (
        <div className="flex items-center gap-2">
            <div className={`flex items-center px-2.5 py-1 rounded-full border border-solid
        ${isPercentage
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-green-50 border-green-200'}`}
            >
                <span className={`font-normal text-sm text-center
          ${isPercentage ? 'text-amber-700' : 'text-green-700'}`}
                >
                    {isPercentage ? `${amount}% OFF` : `$${amount} OFF`}
                </span>
            </div>
        </div>
    );
};

export default DiscountBadge