
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
import ProductMenu from "@/components/sb/ProductMenu";
import TopStrip from "@/components/sb/TopStrip";

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
  productMenu: ProductMenu,
  topStrip: TopStrip,
};

// Initiera Storyblok en gångg
export const getStoryblokApi = storyblokInit({
	accessToken: process.env.STORYBLOK_DELIVERY_API_ACCESS_TOKEN || process.env.NEXT_PUBLIC_STORYBLOK_DELIVERY_API_ACCESS_TOKEN,
	use: [apiPlugin],
	apiOptions: {
		region: 'eu',
	},
    components
});