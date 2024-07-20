export type Guitar = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

export type CartItem = Guitar & {
  quantity: number;
}

// export type GuitarID = Pick<Guitar, 'id'>
// export type GuitarId = Guitar['id']
// export type PickCartItem = Pick<Guitar, 'id' | 'name'> & {
//   quantity: number;
// }

// export type OmitCartItem = Omit<Guitar, 'id' | 'name'> & {
//   quantity: number;
// }