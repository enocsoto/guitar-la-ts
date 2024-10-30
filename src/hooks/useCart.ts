// import {
//   useEffect,
//   useState,
//   useMemo
// } from 'react'
// import { db } from '../utils/db'
// import type {
//   CartItem,
//   GuitarT
// } from '../types/guitarType'
// export const MAX_ITEMS = 5
// export const MIN_ITEMS = 1
// export function useCart() {
// const initialState = (): CartItem[] => {
//   const localStorageCart = localStorage.getItem('stateCart')
//   return localStorageCart ? JSON.parse(localStorageCart) : []
// }
// const [data] = useState(db)
// const [cart, setCart] = useState(initialState)

// useEffect(() => {
//   localStorage.setItem('stateCart', JSON.stringify(cart))
// }, [cart])

// const addToCart = (item: GuitarT) => {
//   const itemExists = cart.findIndex(({ id }) => id === item.id)
//   if (itemExists >= 0) {
//     if (cart[itemExists].quantity >= MAX_ITEMS) return
//     console.log(`guitarra ya existe`)
//     const updatedCart = [...cart]
//     updatedCart[itemExists].quantity++
//     setCart(updatedCart)
//   } else {
//     const newItem: CartItem = { ...item, quantity: 1 }
//     setCart([...cart, newItem])
//   }
// }

// const deletefromCart = (itemId: GuitarT['id']) => {
//   const removeItem = cart.filter(({ id }) => id !== itemId)
//   setCart(removeItem);
// }

// const removeItemCart = (id: GuitarT['id']) => {
//   const removeQuantityItem: CartItem[] = cart.map(item => {
//     if (item.id === id && item.quantity > MIN_ITEMS) {
//       return {
//         ...item,
//         quantity: item.quantity - 1
//       }
//     }
//     return item
//   })
//   setCart(removeQuantityItem)
// }

// const increaseQuantity = (id: GuitarT['id']) => {
//   const itemIncrement: CartItem[] = cart.map((item) => {
//     if (item.id === id && item.quantity < MAX_ITEMS) {
//       return {
//         ...item,
//         quantity: item.quantity + 1
//       }
//     }
//     return item
//   })
//   setCart(itemIncrement)
// }

// const emptyCart = () => {
//   setCart([])
// }

// const isEmpty: boolean = useMemo(() => cart.length === 0, [cart])

// const cartTotal: number = useMemo(() => cart.reduce((acc, item) => acc + (item.quantity * item.price), 0), [cart])
// return {
// data,
// cart,
// addToCart,
// deletefromCart,
// removeItemCart,
// increaseQuantity,
// emptyCart,
// isEmpty,
// cartTotal
//   }
// }