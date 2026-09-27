import ProductCard from './ProductCard'

export default {
  title: 'Components/ProductCard',
  component: ProductCard
}

const sampleProduct = {
  id: 1,
  title: 'Baby Stroller',
  price: 129.99,
  image: 'https://via.placeholder.com/200'
}

export const Default = () => <ProductCard product={sampleProduct} />
