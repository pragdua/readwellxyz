import React from "react";
import Link from "next/link";

type PostCardProps = {
  title: string;
  author: string;
  url: string;
  category?: string;
};

const PostCard = (props: PostCardProps) => {
  return (
    <div>
      <Link href={props.url}>
        <div className="font-spectral font-medium text-lg md:text-xl cursor-pointer hover:opacity-60 transition-all">
          {props.title}
        </div>
      </Link>
      <div className="font-spectral font-medium text-base md:text-lg opacity-50">
        {props.author}
      </div>
    </div>
  );
};

export default PostCard;
