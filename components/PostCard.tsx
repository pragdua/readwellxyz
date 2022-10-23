import React, { useEffect } from "react";
import Link from "next/link";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

type PostCardProps = {
  title: string;
  author: string;
  url: string;
  category?: string;
};

const boxVariant = {
  visible: { opacity: 1, transition: { duration: 1 } },
  hidden: { opacity: 0 },
};

const PostCard = (props: PostCardProps) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <motion.div
      className="box"
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
    >
      <Link href={props.url}>
        <div className="font-spectral font-medium text-lg md:text-xl cursor-pointer hover:opacity-60 transition-all">
          {props.title}
        </div>
      </Link>
      <div className="font-spectral font-medium text-base md:text-lg opacity-50">
        {props.author}
      </div>
    </motion.div>
  );
};

export default PostCard;
