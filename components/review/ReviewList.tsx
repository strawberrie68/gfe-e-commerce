import clsx from "clsx"
import { v4 as uuidv4 } from 'uuid';
import { RiChatSmile3Line } from 'react-icons/ri';

import { formatDate } from "./utils"
import { useProductReviewsContext } from "./ProductReviewsContextProvider"
import Avatar from "../ui/Avatar"
import StarRating from "../ui/StarRating"
import Button from "../ui/Button"


const ReviewList = () => {
    const { reviews, pagination, loadMoreReviews, isFetchingMore, currentPage } =
        useProductReviewsContext();
    const moreReviewsCount = pagination.total - reviews.length;

    if (reviews.length === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-5">
                <div
                    className={clsx(
                        'size-12 rounded-full bg-white shadow',
                        'flex items-center justify-center',
                        'text-indigo-700',
                    )}>
                    <RiChatSmile3Line className="size-6" />
                </div>
                <div
                    className={clsx(
                        "gap-2', 'text-neutral-900 flex flex-col items-center text-center",
                    )}>
                    <span className="text-xl font-medium">No reviews yet!</span>
                    <span>Be the first to review this product</span>
                </div>
            </div>
        );
    }

    if (currentPage === 1 && isFetchingMore) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-5">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 px-4 md:px-8 lg:px-0">
            <ul className="flex flex-col lg:pr-8 gap-8">
                {reviews.map((review) => {
                    return (
                        <li
                            className="flex flex-col gap-4"
                            key={uuidv4()}
                        >
                            <div className={clsx(
                                "flex justify-between"
                            )}>
                                <div className="flex gap-4">
                                    <Avatar image={review.user.avatar_url} name={review.user.name} />
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-base text-neutral-900">{review.user.name}</span>
                                        <StarRating rating={review.rating} />
                                    </div>
                                </div>
                                <span className="font-normal text-xs text-neutral-600">{formatDate(review.created_at)}</span>
                            </div>
                            {review.content && <p className="font-normal text-base text-neutral-600">{review.content}</p>}

                        </li>
                    )
                })}
            </ul>

            {pagination.has_more && (
                <div className="w-full self-stretch px-4 py-6">
                    <Button
                        label={`See ${moreReviewsCount} more reviews`}
                        variant="secondary"
                        size="lg"
                        onClick={loadMoreReviews}
                        isDisabled={isFetchingMore}
                        className="w-full"
                    />
                </div>
            )}

        </div>
    )
}

export default ReviewList