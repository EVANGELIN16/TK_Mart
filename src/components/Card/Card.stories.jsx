import GlassCard from "./Card";

export default {
  title: "Components/GlassCard",
  component: GlassCard,
};

const sampleProduct = {
  id: 1,
  title: "iPhone 15 Pro",
  price: 999,
  thumbnail: "https://via.placeholder.com/300",
};

export const Default = () => (
  <GlassCard
    product={sampleProduct}
    showWishlist={true}
    showAddToCart={true}
    onWishlistToggle={{ isWishlisted: false, toggle: () => {} }}
    onAddToCart={() => {}}
  />
);
