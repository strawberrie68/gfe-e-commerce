import clsx from "clsx";
import { useProductReviewsContext } from './ProductReviewsContextProvider';
const Reviews = () => {
    const { isInitialLoading, reviews } = useProductReviewsContext();
    return (
        <div className={clsx("h-[calc(100vh-232px)] w-full")}>
            {isInitialLoading || !reviews ? (
                <div className="flex h-full w-full items-center justify-center">
                    Loading...
                </div>
            ) : (
                <div className={clsx("flex flex-col gap-10 lg:flex-row lg:gap-8")}>
                </div>
            )}

        </div>)
}


export default Reviews