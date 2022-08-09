import { FC } from 'react';
import useSWR from 'swr';

interface Props {
  index?: boolean
}

const Footer: FC<Props> = ({ index }:Props) => {
  const { data } = useSWR<{ views: string }>(typeof document !== 'undefined' ? `/api/views/${document.location.pathname}` : '');
  let views = '?';
  if (data) {
    views = data.views;
  }
  return (
    <footer className="text-xl mt-16">
      <p>
        Made with ❤️ by
        {' '}
        <span className="font-bold">
          Maximilian Gaedig
        </span>
        <br />
        Views:
        {' '}
        {views}
        {index && (
        <>
          <br />
          <br />
          <span className="text-base">
            My usage frequency and experience of my skills is mostly based on self assessment,
            experience is on a scale from 0-9,
            {' '}
            of which 9 is knowing everything and 0 is knowing nothing.
            <br />
            In the future I plan to replace this with
            {' '}
            a widely used assessment system if I find one.
          </span>
        </>
        )}
      </p>
    </footer>
  );
};

Footer.defaultProps = { index: false };

export default Footer;
