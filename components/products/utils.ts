export interface Product {
    product_id: string;
    name: string;
    description: string;
    category: {
        category_id: string;
        name: string;
        created_at: string;
    };
    collection: {
        collection_id: string;
        name: string;
        description: string;
        image_url: string;
        created_at: string;
    };
    created_at: string;
    colors: string[];
    images: {
        color: string;
        image_url: string;
    }[];
    info: {
        title: string;
        description: string[];
    }[];
    inventory: {
        sku: string;
        color: string;
        size: string;
        list_price: number;
        discount: number | null;
        discount_percentage: number;
        sale_price: number;
        sold: number;
        stock: number;
    }[];
    priceRange: {
        highest: number;
        lowest: number;
    };
    rating: number;
    reviews: number;
    sizes: string[];
    sold: number;
}

export interface ColorType {
    value: string;
    label: string;
}

export interface InventoryData {
    sku: string;
    color: string;
    size: string;
    list_price: number;
    discount: number | null;
    discount_percentage: number;
    sale_price: number;
    sold: number;
    stock: number;
}

interface GetUnavailableSizesProps {
    product: Product;
    color: ColorType;
}

interface GetInventoryDataProps {
    product: Product;
    color: ColorType;
    size: string;
}

export const getUnavailableColors = (product: Product) => {
    const allColors = new Set(product.colors);
    const colorsInStock = new Set();

    product.inventory.forEach((item) => {
        if (item.stock > 0) {
            colorsInStock.add(item.color);
        }
    });

    const unavailableColor = [...allColors].filter((color) => !colorsInStock.has(color));
    return unavailableColor;
};

export const getUnavailableSizes = ({ product, color }: GetUnavailableSizesProps) => {
    const allSize = new Set(product.sizes);
    const inStockSizes = new Set();

    product.inventory.forEach((item) => {
        if (item.stock > 0 && item.color === color.value) {
            inStockSizes.add(item.size);
        }
    });

    const unavailableSize = [...allSize].filter((size) => !inStockSizes.has(size));
    return unavailableSize;
};

export const getInventoryData = ({ product, color, size }: GetInventoryDataProps): InventoryData | null => {
    let data: InventoryData | null = null;
    product.inventory.forEach((item) => {
        if (item.size === size && item.color === color.value) {
            data = item;
        }
    });

    return data;
};

export const getSelectedColorImages = (product: Product, color: string | null): { color: string; image_url: string; }[] => {
    if (!color) return [];
    const images = product.images?.filter((image) => image.color === color);
    return images || [];
};
