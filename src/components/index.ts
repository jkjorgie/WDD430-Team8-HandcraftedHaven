/**
 * Component Barrel Exports
 *
 * Organized by feature:
 * - ui/       : Generic UI components (AuthButton, Providers)
 * - layout/   : Layout components (Header)
 * - product/  : Product-related components (ProductCard, ProductBrowser, etc.)
 * - seller/   : Seller-specific components (SellerProductCard, SellerProfileForm)
 */

// UI Components
export { AuthButton } from "./ui/AuthButton";
export { Providers } from "./ui/Providers";

// Layout Components
export { Header } from "./layout/Header";

// Product Components
export { ProductCard } from "./product/ProductCard";
export { ProductBrowser } from "./product/ProductBrowser";
export { ProductRating } from "./product/ProductRating";
export { StarRating } from "./product/StarRating";

// Seller Components
export { SellerActions } from "./seller/SellerActions";
export { SellerProductCard } from "./seller/SellerProductCard";
export {
  SellerProfileForm,
  type SellerProfileData,
} from "./seller/SellerProfileForm";
