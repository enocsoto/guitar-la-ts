import { CartItem, GuitarT } from "../types/guitarType";
import { db } from "../utils/db";
import { MAX_ITEMS, MIN_ITEMS } from "../utils/limit.items";

export type CartActions =
  { type: 'add-to-cart', payload: { item: GuitarT } } |
  { type: 'remove-from-cart', payload: { id: GuitarT['id'] } } |
  { type: 'decrease-quantity', payload: { id: GuitarT['id'] } } |
  { type: 'increase-quantity', payload: { id: GuitarT['id'] } } |
  { type: 'clear-cart' }

export type CartState = {
  data: GuitarT[],
  cart: CartItem[],
}

const initialCart = (): CartItem[] => {
  const localStorageCart = localStorage.getItem('stateCart')
  return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState: CartState = {
  data: db,
  cart: initialCart(),
};

export const cartReducer = (state: CartState, action: CartActions) => {
  if (action.type === 'add-to-cart') {
    const itemExists = state.cart.find(({ id }) => id === action.payload.item.id)
    let updatedCart: CartItem[] = [];
    if (itemExists) {
      updatedCart = state.cart.map(item => {
        if (item.id === action.payload.item.id) {
          if (item.quantity < MAX_ITEMS) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        } else {
          return item
        }
      })
    } else {
      const newItem: CartItem = { ...action.payload.item, quantity: 1 }
      updatedCart = [...state.cart, newItem]
    }
    return { ...state, cart: updatedCart }
  }

  if (action.type === 'remove-from-cart') {
    const cart = state.cart.filter(({ id }) => id !== action.payload.id)
    return {
      ...state,
      cart,
    }
  }

  if (action.type === 'decrease-quantity') {
    const cart: CartItem[] = state.cart.map(item => {
      if (item.id === action.payload.id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    return { ...state, cart }
  }

  if (action.type === 'increase-quantity') {
    const cart: CartItem[] = state.cart.map((item) => {
      if (item.id === action.payload.id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    return { ...state, cart }
  }

  if (action.type === 'clear-cart') {
    return {
      ...state,
      cart: state.cart = [],
    }
  }

  return state;

}