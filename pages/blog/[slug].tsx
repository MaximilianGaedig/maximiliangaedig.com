import type { GetStaticProps, NextPage } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '../../components/Layout';
import { getPost, getPosts, Post } from '../../utils/blog';
import styles from '../../styles/post.module.css';

interface Props {
  post: Post
}
const PostPage: NextPage<Props> = ({ post }: Props) => (
  <Layout>
    <div className={`mx-auto p-5 xl:w-2/3 border border-zinc-600 rounded-3xl ${styles.post}`}>
      <div>
        <MDXRemote {...post.content} />
      </div>
      <p className="text-sm text-zinc-400">{post.date}</p>
    </div>
  </Layout>
);
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (!params || typeof params.slug !== 'string') {
    throw new Error('Slug should be defined');
  }
  const { slug } = params;
  return {
    props: {
      post: await getPost(slug),
    },
  };
};
export const getStaticPaths = async () => ({
  paths: (await getPosts()).map((post) => ({ params: { slug: post.slug } })),
  fallback: false,
});
export default PostPage;
