import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const new_product_cart: Product = await (await api.get(`/products/${productId}`)).data;
      new_product_cart.amount = 1;
      setCart([...cart, new_product_cart]);
      let new_cart: Product[] = [];

      const product_cart = cart.filter(product => (product.id === productId))

      if (product_cart.length > 0) {
        product_cart[0].amount += 1;
        new_cart = ([...cart, product_cart[0]]);
      } else {
        const new_product_cart: Product = await (await api.get(`/products/${productId}`)).data;
        new_product_cart.amount = 1;
        new_cart = ([...cart, new_product_cart]);
      }
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(new_cart));
      setCart(new_cart);

    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
