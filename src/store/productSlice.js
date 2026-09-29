import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts, getProductById } from '../api/products'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => await getProducts()
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => await getProductById(id)
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    selectedProduct: null,
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH ALL PRODUCTS
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false
      })

      // FETCH SINGLE PRODUCT
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.loading = false
      })
  }
})

export default productsSlice.reducer
