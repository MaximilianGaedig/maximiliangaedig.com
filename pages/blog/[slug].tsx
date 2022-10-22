import type { GetStaticProps, NextPage } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '../../components/Layout';
import { getPost, getPosts, Post } from '../../utils/blog';
import styles from '../../styles/post.module.css';
import useViews from '../../hooks/useViews';

interface Props {
  post: Post
}
const PostPage: NextPage<Props> = ({ post }: Props) => {
  const views = useViews(`blog-${post.slug}`, true);
  return (
    <Layout>
      <div className={`mx-auto md:p-5 md:border md:border-zinc-600 md:rounded-3xl xl:w-2/3 ${styles.post}`}>
        <h1>{post.title}</h1>
        <p className="text-sm text-zinc-400">
          Maximilian Gaedig •
          {new Date(post.date).toDateString()}
          •
          {post.readingTime}
          •
          {views}
          {' '}
          {views === '1' ? 'view' : 'views'}
        </p>
        <article>
          <MDXRemote compiledSource={post.serialized} />
        </article>
      </div>
    </Layout>
  );
};
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params || typeof params.slug !== 'string') {
    throw new Error('Slug should be defined');
  }
  const { slug } = params;
  const post = await getPost(slug);
  return {
    props: {
      post,
    },
  };
};
export const getStaticPaths = async () => ({
  paths: (await getPosts()).map((post) => ({ params: { slug: post.slug } })),
  fallback: false,
});
export default PostPage;
