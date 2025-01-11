"use client"
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useMediaQuery } from '@react-hook/media-query';

interface User {
    name: string;
    user_id: string;
    avatar_url: string | null;
}

export interface Review {
    rating: number;
    content: string | null;
    created_at: string;
    user: User;
}

interface Aggregate {
    counts: {
        count: number;
        rating: number;
    }[];
    rating: number;
    total: number;
}

const defaultAggregate: Aggregate = {
    counts: [],
    rating: 0,
    total: 0,
};

interface Pagination {
    has_more: boolean;
    total: number;
}

interface ReviewsResponse {
    aggregate: Aggregate;
    data: Review[];
    pagination: Pagination;
}

interface ReviewsContextType {
    reviews: Review[];
    pagination: Pagination,
    isInitialLoading: boolean,
    isFetchingMore: boolean,
    currentPage: number
    aggregateRating: Aggregate,
    selectedRating: number | null,
    onRatingSelect: (value: number | null) => void,
    loadMoreReviews: () => void;
}


const ProductReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const useProductReviewsContext = (): ReviewsContextType => {
    const context = useContext(ProductReviewsContext);
    if (context === undefined) {
        throw new Error('useProductReviewsContext must be used within a ProductReviewsContextProvider');
    }
    return context;
};

interface ProviderProps {
    children: React.ReactNode;
}

const ProductReviewsContextProvider: React.FC<ProviderProps> = ({ children }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isInitialLoading, setIsInitialLoading] = useState(false);
    const [isFetchingMore, setIsFetchingMore] = useState(false)
    const [pagination, setPagination] = useState<Pagination>({
        has_more: false,
        total: 0,
    })
    const [aggregateRating, setAggregateRating] = useState<Aggregate>(defaultAggregate);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);


    const isDesktopView = useMediaQuery('(min-width: 1024px)');
    const limit = isDesktopView ? 12 : 10;

    const getReviews = useCallback(async (initialFetching = false): Promise<void> => {
        if (initialFetching) {
            setIsInitialLoading(true)
        } else {
            setIsFetchingMore(true)
        }
        try {
            const response = await fetch(
                `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/voyager-hoodie/reviews?page=${currentPage}&per_page=${limit}
                ${selectedRating ? `&rating=${selectedRating}` : ""}`
            );
            const result: ReviewsResponse = await response.json();

            if (result) {
                setReviews(currentPage === 1 ? result.data : (prev) => [...prev, ...result.data]);
                setAggregateRating(result.aggregate);
                setPagination({
                    has_more: result.pagination.has_more,
                    total: result.pagination.total,
                });
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setIsInitialLoading(false);
            setIsFetchingMore(false)
        }
    }, [currentPage, limit, selectedRating]);

    useEffect(() => {
        getReviews(isInitialLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, selectedRating]);

    const loadMoreReviews = useCallback((): void => {
        if (pagination.has_more) {
            setCurrentPage(prev => prev + 1);
        }
    }, [pagination.has_more]);

    const onRatingSelect = useCallback((value: number | null) => {
        setSelectedRating(value);
        setCurrentPage(1)
    }, []);

    const value: ReviewsContextType = useMemo(
        () => ({
            reviews,
            pagination,
            isInitialLoading,
            isFetchingMore,
            currentPage,
            aggregateRating,
            selectedRating,
            loadMoreReviews,
            onRatingSelect,
        }),
        [
            reviews,
            pagination,
            isInitialLoading,
            isFetchingMore,
            currentPage,
            aggregateRating,
            selectedRating,
            loadMoreReviews,
            onRatingSelect,
        ],
    );

    return (
        <ProductReviewsContext.Provider value={value}>
            {children}
        </ProductReviewsContext.Provider>
    );
};

export default ProductReviewsContextProvider;
