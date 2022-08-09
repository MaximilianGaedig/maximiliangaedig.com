import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import { IoMdArrowRoundForward } from 'react-icons/io';
import Image from 'next/image';
import { Post, getPosts } from '../utils/blog';
import styles from '../styles/post.module.css';
import Layout from '../components/Layout';
import setAndGetViews from '../utils/views';

interface Props {
  posts: Post[]
  views: string
}

const Blog: NextPage<Props> = ({ posts, views }: Props) => (
  <Layout views={views}>
    <h1 className="text-2xl font-bold text-center my-4">My blog</h1>
    <div className="flex flex-col gap-5">
      {posts.map((
        {
          date,
          content,
          slug,
          readingTime,
          tags,
          thumbnail,
        },
      ) => (
        <Link key={slug} href={`/blog/${slug}`}>
          <div className="flex flex-col gap-5 group border border-zinc-600 rounded-xl p-5">
            <div className="flex flex-col md:flex-row w-full gap-5">
              <div className="flex flex-col gap-5">
                <div className="flex-grow">
                  <div className={styles.post}>
                    <MDXRemote {...content} />
                  </div>
                </div>
                <div className="flex cursor-pointer items-end text-base gap-2">
                  {tags.map((tag) => <span key={tag} className="bg-zinc-900 py-2 px-4 rounded-full">{tag}</span>)}
                </div>
              </div>
              <Image src={`/${thumbnail}`} width={300} height={150} className="rounded-2xl" />
            </div>
            <div className="flex justify-between cursor-pointer items-end">
              <span className="text-xl font-bold transition-transform group-hover:translate-x-3">
                Read more
                <IoMdArrowRoundForward className="inline ml-2" />
              </span>
              <p className="text-sm text-zinc-400">
                {readingTime}
                ,
                {' '}
                {new Date(date).toDateString()}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </Layout>
);

export const getServerSideProps: GetServerSideProps<Props> = async () => ({
  props: {
    posts: await getPosts(),
    views: await setAndGetViews('/blog'),
  },
});

export default Blog;
