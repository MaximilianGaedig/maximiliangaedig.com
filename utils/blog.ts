import { readdir, readFile } from 'fs/promises';
import readingTime from 'reading-time';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type Post = {
  date: string
  content: MDXRemoteSerializeResult
  slug: string
  readingTime: string
  tags: string[]
  thumbnail: string
};

export const getPost = async (file: string, fullPost: boolean = true) => {
  const {
    data: {
      date,
      tags,
      thumbnail,
    }, content,
  } = matter(await readFile(`./posts/${file}.mdx`, 'utf-8'));
  return {
    date,
    content: fullPost ? await serialize(content) : await serialize(
      `${content.split('\n')
        .slice(0, 4)
        .join('\n')
        .replace(/\n$/g, '')
        .substring(0, 1200)}${content.length > 1200 ? '...' : ''}`,
    ),
    slug: file.replace('.mdx', ''),
    readingTime: readingTime(content).text,
    tags,
    thumbnail,
  };
};

export const getPosts = async (full: boolean = false): Promise<Post[]> => Promise.all((await readdir('./posts', { withFileTypes: true }))
  .filter((d) => d.isFile() && d.name.endsWith('.mdx'))
  .map(async (file) => getPost(file.name.replace(/.mdx$/g, ''), full)));
