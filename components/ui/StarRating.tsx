import React from 'react';
import { StarIcon } from 'lucide-react';
import clsx from 'clsx';

interface StarRatingProps {
    isRatingShown?: boolean;
    fontSize?: "md" | "lg";
    rating?: number;
    totalStars?: number;
    size?: number;
    gap: string

}

const StarRating: React.FC<StarRatingProps> = ({ gap = "gap-1", isRatingShown = false, fontSize = "md", rating = 0, totalStars = 5, size = 20 }) => {
    const filledStars = Math.floor(rating);
    const hasPartialStar = rating % 1 !== 0;
    const partialWidth = `${(rating % 1) * 100}%`;

    const fontSizeClasses = {
        md: "text-base",
        lg: "text-xl"
    } as const

    return (
        <div className="flex items-center gap-2">
            {/* Rating value */}
            {isRatingShown &&
                <span className={`${isRatingShown ? "font-semibold" : "font-normal"} ${fontSizeClasses[fontSize]} text-neutral-900`}>
                    {rating.toFixed(1)}
                </span>
            }

            {/* Star icons */}
            <div className={clsx('flex', `${gap}`)}>
                {[...Array(totalStars)].map((_, index) => (
                    <div key={index} className="relative">
                        {/* Background star (empty) */}
                        <StarIcon
                            size={size}
                            className="text-gray-200"
                            fill="currentColor"
                            strokeWidth={1}
                        />

                        {/* Filled star */}
                        {index < filledStars && (
                            <div className="absolute inset-0">
                                <StarIcon
                                    size={size}
                                    className="text-yellow-400"
                                    fill="currentColor"
                                    strokeWidth={1}
                                />
                            </div>
                        )}

                        {/* Partial star */}
                        {hasPartialStar && index === filledStars && (
                            <div
                                className="absolute inset-0 overflow-hidden"
                                style={{ width: partialWidth }}
                            >
                                <StarIcon
                                    size={size}
                                    className="text-yellow-400"
                                    fill="currentColor"
                                    strokeWidth={1}
                                />
                            </div>
                        )}
                    </div>
                ))}

            </div>


        </div>
    );
};

export default StarRating