import React, { createContext, useCallback, useContext } from "react";
import { ChildrenType, Cart as CartAPIType } from "../helper/types";
import { axiosPublic } from "../../axios";
import { api_routes } from "../helper/routes";
import { AuthContext } from "./AuthProvider";
import useSWR, { useSWRConfig } from 'swr'
import { useToast } from "../hooks/useToast";
import { useLogin } from "./LoginProvider";

type CartUpdateDataType = {
  product_id: number,
  quantity: number,
}

export type CartContextType = {
  cart: CartAPIType | undefined;
  cartLoading: boolean;
  updateCart: (data: CartUpdateDataType[]|[]) => Promise<void>;
  fetchCart: () => Promise<void>;
  updateCartData: (data: CartAPIType) => Promise<void>;
  incrementProductQuantity: (product_id: number) => Promise<void>;
  decrementProductQuantity: (product_id: number) => Promise<void>;
  removeCartItem: (product_id: number) => Promise<void>;
}

const cartDefaultValues: CartContextType = {
  cart: undefined,
  cartLoading: false,
  updateCart: async (data: CartUpdateDataType[]|[]) => {},
  fetchCart: async () => {},
  updateCartData: async (data: CartAPIType) => {},
  incrementProductQuantity: async (product_id: number) => {},
  decrementProductQuantity: async (product_id: number) => {},
  removeCartItem: async (product_id: number) => {},
};

export const CartContext2 = createContext<CartContextType>(cartDefaultValues);

export const useCart = () => useContext(CartContext2);


const CartProvider2: React.FC<ChildrenType> = ({children}) => {
    const {auth} = useContext(AuthContext);
    const {toastError, toastSuccess} = useToast();
    const {toggleLoginModal} = useLogin();

    const fetcher = useCallback(
      async (url: string) => {
        if(auth.authenticated){
          const headers = {
            headers: {
              "Authorization" : `Bearer ${auth.token}`,
              "Accept": 'application/json'
            }
          }
          const res =  await axiosPublic.get(url,headers)
          return res.data.cart;
        }
        return undefined;
      },
      [auth],
    );
    
    const { data:cart, isLoading:cartLoading, mutate:mutateCartData } = useSWR<CartAPIType>(auth.authenticated ? api_routes.cart : null, fetcher);
    const { mutate } = useSWRConfig()
    
    const fetchCart = async () => {await mutate(api_routes.cart)}

    const updateCartData = async (data: CartAPIType) => {
      if(auth.authenticated){
        await mutateCartData(data);
      }else{
        toastError('Please login to add product to cart');
        toggleLoginModal()
      }
    }
    
    const updateCart = async (data: CartUpdateDataType[]|[]) => {
      if(auth.authenticated){
        try {
          const response = await axiosPublic.post(api_routes.cart, data.length>0 ? {data:data}: {});
          await mutateCartData(response.data.cart);
        } catch (error: any) {
          console.log(error);
        }
      }else{
        toastError('Please login to add product to cart');
        toggleLoginModal()
      }
    }

    const incrementProductQuantity = async(product_id: number) => {
      if(auth.authenticated && cart){
        const cart_main = cart.products.map(item => {return {product_id:item.id, quantity: item.quantity, maximum_quantity: item.inventory}})
        const products_item_index = cart_main.findIndex(item => item.product_id===product_id)
        if(products_item_index>-1){
          cart_main[products_item_index].quantity = Math.min(cart_main[products_item_index].quantity+1, cart_main[products_item_index].maximum_quantity)
          await updateCart([...cart_main.map(item => {return {product_id:item.product_id, quantity: item.quantity}})])
        }else{
          await updateCart([{quantity:1, product_id: product_id},...cart_main.map(item => {return {product_id:item.product_id, quantity: item.quantity}})])
          toastSuccess('Product Added To Cart');
        }
      }else{
        toastError('Please login to add product to cart');
        toggleLoginModal()
      }
    }
    
    const decrementProductQuantity = async(product_id: number) => {
      if(auth.authenticated && cart){
        const cart_main = cart.products.map(item => {return {product_id:item.id, quantity: item.quantity, maximum_quantity: item.inventory}})
        const products_item_index = cart_main.findIndex(item => item.product_id===product_id)
        if(products_item_index>-1){
          if(cart_main[products_item_index].quantity===1){
            const cart_item_removed = cart_main.filter(item => item.product_id!==product_id)
            await updateCart([...cart_item_removed.map(item => {return {product_id:item.product_id, quantity: item.quantity}})])
            toastSuccess('Product Removed From Cart');
          }else{
            cart_main[products_item_index].quantity = Math.max(1, cart_main[products_item_index].quantity-1)
            await updateCart([...cart_main.map(item => {return {product_id:item.product_id, quantity: item.quantity}})])
          }
        }
      }else{
        toastError('Please login to remove item from cart');
        toggleLoginModal()
      }
    }
    
    const removeCartItem = async(product_id: number) => {
      if(auth.authenticated && cart){
        const cart_main = cart.products.map(item => {return {product_id:item.id, quantity: item.quantity, maximum_quantity: item.inventory}})
        const products_item_index = cart_main.findIndex(item => item.product_id===product_id)
        if(products_item_index>-1){
          const cart_item_removed = cart_main.filter(item => item.product_id!==product_id)
          await updateCart([...cart_item_removed.map(item => {return {product_id:item.product_id, quantity: item.quantity}})])
        }
      }else{
        toastError('Please login to remove item from cart');
        toggleLoginModal()
      }
    }

    return (
      <CartContext2.Provider value={{cart: cart, cartLoading, updateCart, fetchCart, incrementProductQuantity, decrementProductQuantity, updateCartData, removeCartItem}}>
          {children}
      </CartContext2.Provider>
    );
}

export default CartProvider2;
