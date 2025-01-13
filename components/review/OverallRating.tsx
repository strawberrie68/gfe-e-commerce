import clsx from "clsx"
import StarRating from "../ui/StarRating"
import Button from "../ui/Button"
import { useProductReviewsContext } from "./ProductReviewsContextProvider"
import ProgressBar from "../ui/ProgressBar"
import { v4 as uuidv4 } from 'uuid';


const OverallRating = () => {
    const { aggregateRating, onRatingSelect, selectedRating } = useProductReviewsContext();

    const ratingData = [
        {
            name: 'Excellent',
            color: '#16A34A',
            value: aggregateRating.counts.find((item) => item.rating === 5)?.count || 0,
            rating: 5,
        },
        {
            name: 'Good',
            color: '#22C55E',
            value: aggregateRating.counts.find((item) => item.rating === 4)?.count || 0,
            rating: 4,
        },
        {
            name: 'Average',
            color: '#FDE047',
            value: aggregateRating.counts.find((item) => item.rating === 3)?.count || 0,
            rating: 3,
        },
        {
            name: 'Below Average',
            color: '#EAB308',
            value: aggregateRating.counts.find((item) => item.rating === 2)?.count || 0,
            rating: 2,
        },
        {
            name: 'Poor',
            color: '#FACC15',
            value: aggregateRating.counts.find((item) => item.rating === 1)?.count || 0,
            rating: 1,
        },
    ];

    return (
        <>
            <div className="flex flex-col gap-6 w-full lg:w-96 self-stretch lg:items-center px-6">
                <div className="flex flex-col gap-2 self-stretch px-4">
                    <h3 className="font-semibold text-xl text-neutral-900">Overall Rating</h3>
                    <div className="flex gap-2 items-center">
                        <StarRating rating={aggregateRating.rating} isRatingShown={true} />
                        <span className="font-normal text-sm text-neutral-600">Based on {aggregateRating.total} reviews</span>
                    </div>
                </div>

                <div className="flex flex-col gap-4 py-4 px-8">
                    {ratingData.map((rating) => {
                        return (
                            <button
                                className={clsx("flex")}
                                key={uuidv4()}
                                onClick={() => onRatingSelect(rating.rating)}
                            >
                                <span className={clsx(
                                    "font-medium text-base text-neutral-600 text-start",
                                    "min-w-[120px]",
                                    {
                                        "text-indigo-700": selectedRating === rating.rating,
                                        "text-neutral-600": selectedRating !== rating.rating,
                                    }
                                )}>
                                    {rating.name}
                                </span>
                                <div className="flex gap-6 items-center md:grow">
                                    <div className="grow">
                                        <ProgressBar color={rating.color} width={rating.value} />
                                    </div>
                                    <span className="font-normal text-base text-neutral-600 max-w-6 text-right">{rating.value}%</span>
                                </div>
                            </button>
                        )
                    })}
                </div>

                <div className="flex items-center gap-6 justify-center">
                    {/* Button to clear filters */}
                    {selectedRating &&
                        <Button onClick={() => onRatingSelect(null)}
                            label="Clear Filter"
                            variant="tertiary"
                            size="xl"
                            className="w-full font-medium text-base text-indigo-700 hover:bg-none">Clear filters
                        </Button>
                    }

                    <Button className={
                        clsx(
                            "shadow-sm font-semibold",
                            `${selectedRating ? "w-full" : "mx-auto max-w-[153px]"}`
                        )}
                        size="xl"
                        variant="secondary">
                        Write a review
                    </Button>
                </div>
            </div>
        </>
    )
}

export default OverallRating
