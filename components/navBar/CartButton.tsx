import { ShoppingBag } from 'lucide-react';
import Badge from './Badge';

interface CartButtonProps {
    cartCount?: number;
}

const CartButton: React.FC<CartButtonProps> = ({ cartCount = 0 }) => {

    const linkColor = "#525252"
    return (<button className='relative min-h-11 min-w-11'>
        <Badge count={cartCount} />
        <ShoppingBag size={24} color={linkColor} aria-label="Shopping Bag" />
    </button>)
}

export default CartButton;