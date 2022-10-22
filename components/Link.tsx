import NextLink from 'next/link';

const Link = ({ href, children, ...props }:{
  href: string,
  children: React.ReactNode,
  [x:string]: any
}) => (
  <NextLink href={href} passHref>
    <a {...props}>
      {children}
    </a>
  </NextLink>
);
export default Link;
