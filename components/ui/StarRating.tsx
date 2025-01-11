import React from 'react';
import { StarIcon } from 'lucide-react';

interface StarRatingProps {
    isRatingShown?: boolean;
    fontSize?: "md" | "lg";
    rating?: number;
    totalStars?: number;
    size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ isRatingShown = false, fontSize = "md", rating = 0, totalStars = 5, size = 20 }) => {
    // Calculate the filled and partial amounts
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
                <span className={`font-normal ${fontSizeClasses[fontSize]} text-neutral-900`}>
                    {rating.toFixed(1)}
                </span>
            }

            {/* Star icons */}
            <div className='flex gap-1'>
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