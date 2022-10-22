import {
  mkdir,
  readdir, readFile, rmdir, writeFile,
} from 'fs/promises';
import readingTime from 'reading-time';
import { serialize } from 'next-mdx-remote/serialize';
import {
  MDXRemote,
  // MDXRemote,
  MDXRemoteSerializeResult,
} from 'next-mdx-remote';
import { Feed } from 'feed';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export type Post = {
  title: string
  date: string
  serialized: string
  rendered: string
  slug: string
  readingTime: string
  tags: string[]
  thumbnail: string
  description: string
};
export type SerializedPost = Post & {
  frontmatter: {
    date: string;
  }
  date: string;
};

export const getPost = async (file: string): Promise<Post> => {
  const serialized: MDXRemoteSerializeResult<
  Record<string, unknown>,
  Record<string, any>> = await serialize(
    await readFile(`./public/posts/${file}.mdx`, 'utf-8'),
    {
      parseFrontmatter: true,
    },
  );
  if (typeof serialized.frontmatter === 'undefined' || Object.keys(serialized.frontmatter).length === 0) {
    throw new Error('Missing frontmatter');
  }
  const {
    title,
    date,
    tags,
    thumbnail,
    description,
  } = (serialized.frontmatter as unknown as Record<string, any>);
  if (typeof title !== 'string' || typeof date !== 'string' || typeof tags !== 'object' || typeof thumbnail !== 'string' || typeof description !== 'string') {
    throw new Error('Invalid frontmatter');
  }

  const html = ReactDOMServer.renderToStaticMarkup(React.createElement(MDXRemote, serialized));

  return {
    title,
    date,
    serialized: serialized.compiledSource,
    rendered: html,
    slug: file.replace('.mdx', ''),
    readingTime: readingTime(html).text,
    tags,
    thumbnail,
    description,
  };
};

export const getPosts = async (): Promise<Post[]> => (await Promise.all((await readdir('./public/posts', { withFileTypes: true }))
  .filter((d) => d.isFile() && d.name.endsWith('.mdx'))
  .map(async (file) => getPost(file.name.replace(/.mdx$/g, '')))))
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).reverse();

// thanks to https://sreetamdas.com/blog/rss-for-nextjs for this part
export const generateRssFeed = async (): Promise<void> => {
  const posts = await getPosts();
  const author = {
    name: 'Maximilian Gaedig',
    email: 'mg@maximiliangaedig.com',
    link: 'https://maximiliangaedig.com',
  };
  const feed = new Feed({
    title: 'Maximilian Gaedig - Blog',
    description: 'My blog about technology, programming, and life.',
    id: 'https://maximiliangaedig.com/blog',
    link: 'https://maximiliangaedig.com/blog',
    language: 'en',
    image: 'https://maximiliangaedig.com/icon.png',
    favicon: 'https://maximiliangaedig.com/favicon.ico',
    copyright: `All rights reserved ${(new Date()).getFullYear()}, Maximilian Gaedig`,
    updated: new Date(posts[0].date),
    feedLinks: {
      rss2: 'https://maximiliangaedig.com/rss/rss.xml',
      atom: 'https://maximiliangaedig.com/rss/atom.xml',
      json: 'https://maximiliangaedig.com/rss/feed.json',
    },
    author,
  });
  posts.forEach((post) => {
    const url = `https://maximiliangaedig.com/blog/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      content: post.rendered,
      description: `${post.rendered.split('\n')
        .slice(0, 4)
        .join('\n')
        .replace(/\n$/g, '')
        .substring(0, 1200)}${post.rendered.length > 1200 ? '...' : ''}`,
      date: new Date(post.date),
    });
  });
  await rmdir('./public/rss', { recursive: true });
  await mkdir('./public/rss', { recursive: true });
  await writeFile('./public/rss/atom.xml', feed.atom1());
  await writeFile('./public/rss/feed.json', feed.json1());
};
