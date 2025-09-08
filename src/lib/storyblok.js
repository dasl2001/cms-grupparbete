
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";


import Page from "@/components/sb/Page";
import Teaser from "@/components/sb/Teaser";
import Feature from "@/components/sb/Feature";
import Grid from "@/components/sb/Grid";
import DoesNotExist from '@/components/sb/DoesNotExist';
import Header from "@/components/sb/Header";
import Footer from "@/components/sb/Footer";
import Hero from "@/components/sb/Hero";
import ImageBanner from "@/components/sb/ImageBanner";
import ImageWithText from "@/components/sb/ImageWithText";
import SearchBar from "@/components/sb/SearchBar";
import ProductList from "@/components/sb/ProductList";
import LatestProductsList from "@/components/sb/LatestProductsList";
import ProductGrid from "@/components/sb/ProductGrid";
import TopStrip from "@/components/sb/TopStrip";
import AddToCartButton from "@/components/sb/AddToCartButton";
import ShopMenu from "@/components/sb/ShopMenu";
import ProductsGrid from "@/components/sb/ProductsGrid";


export const components = {
  page: Page,
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  header: Header,
  footer: Footer,
  hero: Hero,
  imageBanner: ImageBanner,
  doesNotExist: DoesNotExist,
  imageWithText: ImageWithText,
  searchBar: SearchBar,
  productList: ProductList,
  latestProductsList: LatestProductsList,
  productGrid: ProductGrid,
  topStrip: TopStrip,
  addToCartButton: AddToCartButton,
  ShopMenu: ShopMenu,
  ProductsGrid: ProductsGrid,
};

// Initiera Storyblok en gång
export const getStoryblokApi = storyblokInit({
	accessToken: process.env.STORYBLOK_DELIVERY_API_ACCESS_TOKEN || process.env.NEXT_PUBLIC_STORYBLOK_DELIVERY_API_ACCESS_TOKEN,
	use: [apiPlugin],
	apiOptions: {
		region: 'eu',
	},
    components
});


export function getStoryblokVersion() {
  return process.env.NODE_ENV !== "production" ? "draft" : "published"
}