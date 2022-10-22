import type { GetServerSideProps, NextPage } from 'next';
import { IoMdArrowRoundForward } from 'react-icons/io';
// import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaRss } from 'react-icons/fa';
import Link from '../components/Link';
import { Post, getPosts, generateRssFeed } from '../utils/blog';
import Layout from '../components/Layout';
import useViews from '../hooks/useViews';

interface Props {
  posts: Post[]
}
const PostElement = ({
  post: {
    date,
    slug,
    readingTime,
    tags,
    thumbnail,
    description,
    title,
  },
}: { post: Post }) => {
  const [animated, setAnimated] = useState(false);
  const [javascript, setJavascript] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const views = useViews(`blog-${slug}`);
  useEffect(() => {
    if (ref.current) {
      setJavascript(true);
    }
    let timeout: NodeJS.Timeout;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setAnimated(true);
        observer.disconnect();
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    // eslint-disable-next-line no-nested-ternary
    <div className={`flex flex-col gap-5 group border border-zinc-600 rounded-xl p-5 ${animated ? 'animate-slideIn' : javascript ? '-translate-x-full' : ''} overflow-hidden`} ref={ref}>
      <div className="flex flex-col md:flex-row w-full gap-5">
        <div className="flex flex-col gap-5 flex-1">
          <div className="flex-grow">
            <Link key={slug} href={`/blog/${slug}`}>
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              <p>{description}</p>
            </Link>
          </div>
          <div className="flex items-end text-base gap-2">
            {tags.map((tag) => (
              <Link key={tag} href={`/blog/tags/${tag}`}>
                <div className="bg-zinc-900 py-2 px-4 rounded-full">{tag}</div>
              </Link>
            ))}
          </div>
        </div>
        <div className="relative md:w-1/3 pb-3.5 md:h-auto w-auto h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/${thumbnail}`} alt={`${title}`} className="rounded-2xl" />
        </div>
      </div>
      <Link key={slug} href={`/blog/${slug}`}>
        <div className="flex justify-between items-end">
          <span className="text-xl font-bold transition-transform group-hover:translate-x-3">
            <span className="mr-2">Read more</span>
            <IoMdArrowRoundForward className="inline" />
          </span>
          <p className="text-sm text-zinc-400">
            Maximilian Gaedig •
            {new Date(date).toDateString()}
            •
            {readingTime}
            •
            {views}
            {' '}
            {views === '1' ? 'view' : 'views'}
          </p>
        </div>
      </Link>
    </div>
  );
};

const Blog: NextPage<Props> = ({ posts }: Props) => (
  <Layout>
    <div className="grid grid-cols-[1fr_auto_1fr] gap-5 justify-items-center items-center mt-10 mb-20">
      <h1 className="text-5xl font-bold text-center col-start-2">My blog</h1>
      <Link href="/rss/atom.xml" className="ml-auto">
        <FaRss />
      </Link>
    </div>
    <div className="flex flex-col gap-5">
      {posts.map((
        post,
      ) => (
        <PostElement key={post.slug} post={post} />
      ))}
    </div>
  </Layout>
);
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await generateRssFeed();
  return {
    props: {
      posts: await getPosts(),
    },
  };
};

export default Blog;
