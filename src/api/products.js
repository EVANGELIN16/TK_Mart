import { api } from './client'

// Get all products
export const getProducts = async () => {
  const res = await api.get('/products')
  return res.data.products;
}

// Get single product
export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`)
  return res.data
}
