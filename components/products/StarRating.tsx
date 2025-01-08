import React from 'react';
import { StarIcon } from 'lucide-react';

const StarRating = ({ rating = 0, totalStars = 5, size = 20 }) => {
    // Calculate the filled and partial amounts
    const filledStars = Math.floor(rating);
    const hasPartialStar = rating % 1 !== 0;
    const partialWidth = `${(rating % 1) * 100}%`;

    return (
        <div className="flex items-center gap-1">
            <span className="font-normal text-xl text-neutral-900">
                {rating.toFixed(1)}
            </span>
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
    );
};

export default StarRating