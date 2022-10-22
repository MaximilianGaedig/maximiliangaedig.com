import { FC, ReactNode } from 'react';

interface Props {
  children?: ReactNode
}

const Footer: FC<Props> = ({ children }:Props) => (
  <footer className="text-xl mt-16">
    <p>
      Made with ❤️ by
      {' '}
      <span className="font-bold">
        Maximilian Gaedig
      </span>
      {children}
    </p>
  </footer>
);

Footer.defaultProps = { children: null };

export default Footer;
