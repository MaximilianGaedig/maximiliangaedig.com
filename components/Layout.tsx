import Head from 'next/head';
import { FC, ReactNode } from 'react';
import Footer from './Footer';

interface Props {
  children: ReactNode
  footerContent?: ReactNode
  [x:string]: any
}

const Layout: FC<Props> = ({
  children, footerContent, ...props
}) => (
  <div {...props}>
    <Head>
      <title>Maximilian Gaedig</title>
      <meta name="description" content="The personal website of Maximilian Gaedig" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS"
        href="/feed.xml"
      />
    </Head>
    <main className="text-xl">
      {children}
    </main>
    <Footer>
      {footerContent}
    </Footer>
  </div>
);

Layout.defaultProps = { footerContent: null };

export default Layout;
