import Head from 'next/head';
import { FC, ReactNode } from 'react';
import Footer from './Footer';

interface Props {
  children: ReactNode
  index?: boolean
  [x:string]: any
}

const Layout: FC<Props> = ({ children, index, ...props }) => (
  <div {...props}>
    <Head>
      <title>Maximilian Gaedig</title>
      <meta name="description" content="My info website" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="text-xl">
      {children}
    </main>
    <Footer index={index} />
  </div>
);

Layout.defaultProps = { index: false };

export default Layout;
