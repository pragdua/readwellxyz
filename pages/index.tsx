import { posts } from "../lib/notion";
import sun from "../public/sun.png";
import Image from "next/image";
import { useState } from "react";
import PostCard from "../components/PostCard";

const categories: string[] = [
  "All", //0
  "Love", //1
  "Mind", //2
  "Health", //3
  "Wealth", //4
  "World", //5
  "Self", //6
];

export default function Home(props: any) {
  const [category, setCategory] = useState(0);

  console.log(categories[category]);

  return (
    <>
      <div className="mt-40 w-3/4 flex flex-col mx-auto sm:ml-32">
        <div className="pb-6">
          <Image src={sun} />
          <div className="font-spectral font-medium text-2xl sm:text-3xl text-mygrey mt-4 leading-6 tracking-tight w-4/5 md:w-1/2">
            rich long form
            <span className="font-bold"> essays, articles & blogs</span> curated
            with care.
          </div>
        </div>
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
          {props.posts.map((result: any, index: number) => {
            const catArr = result.properties.Category.multi_select.map(
              (item: any) => item.name
            );
            console.log(catArr);
            if (
              catArr.includes(categories[category]) === true ||
              category === 0
            )
              return (
                <PostCard
                  title={result.properties.Name?.title[0]?.plain_text}
                  author={result.properties.Author?.rich_text[0]?.plain_text}
                  url={result.properties.PostLink?.rich_text[0]?.plain_text}
                  key={result.id}
                  category={result.properties.Category.multi_select}
                ></PostCard>
              );
          })}
        </div>
      </div>
    </>
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
