import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    ReactNode,
    useRef,
} from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getUnavailableSizes } from './utils';
import { Product } from './utils';
interface ProductDetailsContextType {
    product: Product | null;
    selectedColor: string | null;
    isProductLoading: boolean;
    itemQuantity: number;
    selectedSize: string | null;
    setSelectedColor: (color: string) => void;
    setSelectedSize: (size: string) => void;
    incrementQuantity: () => void;
    decrementQuantity: () => void;
}

interface ProductDetailsProviderProps {
    children: ReactNode;
}

const ProductDetailsContext = createContext<ProductDetailsContextType | undefined>(undefined);

export const useProductDetailsContext = () => {
    const context = useContext(ProductDetailsContext);
    if (!context) {
        throw new Error("useProductDetailsContext must be used within a ProductDetailsProvider");
    }
    return context;
};
const ProductDetailsContextProvider: React.FC<ProductDetailsProviderProps> = ({ children }) => {
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [isProductLoading, setIsProductLoading] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const handleColorChange = useCallback((color: string) => {
        setSelectedColor(color);
    }, []);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [itemQuantity, setItemQuantity] = useState(1);

    const params = useParams<{ id: string }>()

    const getProduct = useCallback(async () => {
        setIsProductLoading(true);
        const data = await fetch(
            `https://www.greatfrontend.com/api/projects/challenges/e-commerce/products/${params.id}`,
        );
        const result = await data.json();

        if (!result.error) {
            setProduct(result);
            const firstColor = result.colors[0];
            handleColorChange(firstColor);
        } else {
            return router.push('/not-found');
        }
        setIsProductLoading(false);
    }, [router]);


    useEffect(() => {
        getProduct();
    }, [getProduct]);

    const decrementQuantity = useCallback(() => {
        setItemQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }, []);

    const incrementQuantity = useCallback(() => {
        setItemQuantity((prev) => prev + 1);
    }, []);

    useEffect(() => {
        if (!product || !selectedColor) {
            return;
        }

        const unavailableSizes = getUnavailableSizes({
            product,
            color: { value: selectedColor, label: selectedColor },
        });
        const availableSizes = [...product.sizes].filter(
            (size) => !unavailableSizes.includes(size),
        );
        if (availableSizes.length > 0) {
            setSelectedSize(availableSizes[0]);
        }
    }, [selectedColor, product]);

    const value = useMemo(() => {
        return {
            product,
            isProductLoading,
            selectedColor,
            setSelectedColor: handleColorChange,
            selectedSize,
            setSelectedSize,
            itemQuantity,
            incrementQuantity,
            decrementQuantity,
        };
    }, [
        product,
        isProductLoading,
        selectedColor,
        handleColorChange,
        selectedSize,
        setSelectedSize,
        itemQuantity,
        incrementQuantity,
        decrementQuantity,
    ]);

    return (
        <ProductDetailsContext.Provider value={value}>
            {children}
        </ProductDetailsContext.Provider>)
}

export default ProductDetailsContextProvider
