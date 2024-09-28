import { useEffect, useState, useMemo } from 'react'
import { db } from '../utils/db'
import type { CarItem, GuitarT } from '../types/guitarType'

export function useCart() {
  const initialState = (): CarItem[] => {
    const localStorageCart = localStorage.getItem('stateCart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  const [data] = useState(db)
  const [cart, setCart] = useState(initialState)
  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  useEffect(() => {
    localStorage.setItem('stateCart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: GuitarT) => {
    const itemExists = cart.findIndex(({ id }) => id === item.id)
    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return
      console.log(`guitarra ya existe`)
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    } else {
      const newItem: CarItem = { ...item, quantity: 1 }
      setCart([...cart, newItem])
    }
  }

  const deletefromCart = (itemId: GuitarT['id']) => {
    const removeItem = cart.filter(({ id }) => id !== itemId)
    setCart(removeItem);
  }

  const removeItemCart = (id: GuitarT['id']) => {
    const removeQuantityItem: CarItem[] = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(removeQuantityItem)
  }

  const increaseQuantity = (id: GuitarT['id']) => {
    const itemIncrement: CarItem[] = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(itemIncrement)
  }

  const emptyCart = () => {
    setCart([])
  }

  const isEmpty: boolean = useMemo(() => cart.length === 0, [cart])

  const cartTotal: number = useMemo(() => cart.reduce((acc, item) => acc + (item.quantity * item.price), 0), [cart])
  return {
    data,
    cart,
    addToCart,
    deletefromCart,
    removeItemCart,
    increaseQuantity,
    emptyCart,
    isEmpty,
    cartTotal
  }
}