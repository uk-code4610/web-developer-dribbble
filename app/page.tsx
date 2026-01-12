"use client";
import { Hero } from "./components/toppage/Hero";
import { FeaturedPosts } from "./components/toppage/FeaturedPosts";
import { Footer } from "./components/toppage/Footer";
const Page = () => {
  return (
    <>
      <Hero />
      <FeaturedPosts />
      <Footer />
    </>
  );
};
export default Page;
