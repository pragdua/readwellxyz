import { useState } from "react";
import Image from "next/image";
import { posts } from "../lib/notion";
import PostCard from "../components/PostCard";
import "../styles/Home.module.css";
import { useCatagories } from "../hooks/useCategories";
import Head from "next/head";
import Link from "next/link";

const categories: string[] = [
  "All",
  "Relationships",
  "Wealth",
  "Self",
  "Mind",
  "Health",
  "World",
];

export default function Home({ posts }: any) {
  const [category, setCategory] = useState(0);
  const links = useCatagories(posts, categories, category);
  const randomLink = () =>
    links[Math.round(Math.random() * (links.length - 1))]?.properties.PostLink
      ?.rich_text[0]?.plain_text;

  return (
    <div className="min-h-full bg-main-grad">
      <Head>
        <title>readwell</title>

        <meta
          name="description"
          content="Rich long form essays, articles & blogs curated with care."
          key="desc"
        />

        <meta property="og:title" content="Curated quality long reading" />

        <meta
          property="og:description"
          content="Rich long form essays, articles & blogs curated with care."
        />

        <meta property="og:image" content="../public/eggsun.jpeg" />
      </Head>
      <div className="mt-40 w-3/4 flex flex-col mx-auto sm:ml-32">
        <div className="pb-6">
          <Image src="/sun.png" height={48} width={48} alt="sun" />
          <div className="font-spectral font-medium text-2xl sm:text-3xl text-mygrey mt-4 leading-6 tracking-tight w-4/5 md:w-1/2">
            rich long form
            <span className="font-bold"> essays, articles & blogs</span> curated
            with care.
          </div>
        </div>
      </div>

      <div className="mt-12 w-3/4 flex flex-col mx-auto sm:ml-32">
        <Link href={randomLink()}>
          <a target="_blank" rel="noreferrer">
            <div className="font-spectral font-medium text-lg md:text-xl cursor-pointer hover:opacity-60 transition-all underline text-mygrey">
              I&apos;m Feeling Lucky
            </div>
          </a>
        </Link>
      </div>

      <div className="font-spectral pl-[12.5%] pr-[12.5%] sm:ml-32 sm:pl-0 font-medium flex flex-row gap-4 mt-12 overflow-x-scroll no-scrollbar text-mygrey">
        {categories.map((cat, i) => (
          <div
            className={`text-lg md:text-xl cursor-pointer transition-all ease-linear ${
              category === i ? "opacity-100" : "opacity-50"
            }`}
            onClick={() => {
              setCategory(i);
            }}
            key={i}
          >
            {cat}
          </div>
        ))}
      </div>

      <div className="w-3/4 flex flex-col mx-auto sm:ml-32">
        <div className="mt-10 flex flex-col gap-9 mb-12 text-mygrey">
          {links.map((link: any) => (
            <PostCard
              title={link?.properties.Name?.title[0]?.plain_text}
              author={link?.properties.Author?.rich_text[0]?.plain_text}
              url={link?.properties.PostLink?.rich_text[0]?.plain_text}
              key={link?.id}
              category={link?.properties.Category.multi_select}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let { results } = await posts();

  return {
    props: {
      posts: results,
    },
  };
}
