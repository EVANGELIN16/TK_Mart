export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart') || '[]')
}

export const saveCart = (items) => {
  localStorage.setItem('cart', JSON.stringify(items))
}
