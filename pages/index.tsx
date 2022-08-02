/* eslint-disable @next/next/no-img-element */
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { createClient } from 'redis';
import {
  SiMatrix,
  SiGithub,
  SiGnubash,
  SiAndroidstudio,
  SiAnsible,
  SiTypescript,
  SiNodedotjs,
  SiNextdotjs,
  SiGit,
  SiTailwindcss,
} from 'react-icons/si';
import { MdDesignServices, MdEmail, MdHardware } from 'react-icons/md';
import {
  FaCss3,
  FaDocker,
  FaHtml5,
  FaJs,
  FaLinux,
  FaNetworkWired,
  FaPython,
  FaRust,
} from 'react-icons/fa';
import { IoHardwareChip } from 'react-icons/io5';
import AccountElement, { Props as AccountElementProps } from '../components/AccountElement';
import TechnologyList from '../components/TechnologyList';

interface Props {
  views: string;
}
const Home: NextPage<Props> = ({ views }: Props) => {
  const accounts: AccountElementProps[] = [
    {
      href: 'https://matrix.to/#/@mg:maximiliangaedig.com',
      label: 'Matrix',
      icon: SiMatrix,
      account: '@mg:maximiliangaedig.com',
    },
    {
      href: 'https://github.com/MaximilianGaedig',
      label: 'Github',
      icon: SiGithub,
      account: '@MaximilianGaedig',
    },
    {
      href: 'mailto:mg@maximiliangaedig.com',
      label: 'Email',
      icon: MdEmail,
      account: 'mg@maximiliangaedig.com',
    },
  ];
  const skills = [
    {
      name: 'JavaScript',
      icon: FaJs,
      gradient: 'from-white to-yellow-300',
      color: '#fde047',
      usage: 4,
      experience: 8,
    },
    {
      name: 'CSS',
      icon: FaCss3,
      gradient: 'from-white to-blue-500',
      color: '#3b82f6',
      usage: 3,
      experience: 6,
    },
    {
      name: 'Tailwind CSS',
      icon: SiTailwindcss,
      gradient: 'from-blue-300 to-blue-500',
      color: '#3b82f6',
      usage: 4,
      experience: 8,
    },
    {
      name: 'HTML',
      icon: FaHtml5,
      gradient: 'from-white to-orange-400',
      color: '#fb923c',
      usage: 4,
      experience: 8,
    },
    {
      name: 'TypeScript',
      icon: SiTypescript,
      gradient: 'from-white to-blue-500',
      color: '#3b82f6',
      usage: 4,
      experience: 8,
    },
    {
      name: 'Node.js',
      icon: SiNodedotjs,
      gradient: 'from-white to-green-500',
      color: '#22c55e',
      usage: 4,
      experience: 8,
    },
    {
      name: 'Next.js',
      icon: SiNextdotjs,
      gradient: 'from-zinc-700 to-white',
      color: '#fff',
      usage: 4,
      experience: 6,
    },
    {
      name: 'React',
      icon: SiNodedotjs,
      gradient: 'from-white to-blue-500',
      color: '#3b82f6',
      usage: 4,
      experience: 6,
    },
    {
      name: 'Rust',
      icon: FaRust,
      gradient: 'from-yellow-300 to-orange-500',
      color: '#f97316',
      usage: 2,
      experience: 4,
    },

    {
      name: 'Linux Server Administration',
      icon: FaLinux,
      gradient: 'from-yellow-500 to-white',
      color: '#fff',
      usage: 4,
      experience: 7,
    },
    {
      name: 'Git',
      icon: SiGit,
      gradient: 'from-white to-orange-500',
      color: '#f97316',
      usage: 4,
      experience: 6,
    },
    {
      name: 'Python',
      icon: FaPython,
      gradient: 'from-yellow-300 to-blue-500',
      color: '#3b82f6',
      usage: 2,
      experience: 5,
    },
    {
      name: 'Bash',
      icon: SiGnubash,
      gradient: 'from-white to-green-500',
      color: '#22c55e',
      usage: 2,
      experience: 4,
    },
    {
      name: 'Docker',
      icon: FaDocker,
      gradient: 'from-white to-blue-500',
      color: '#3b82f6',
      usage: 3,
      experience: 6,
    },
    {
      name: 'AOSP Building/ROM flashing',
      icon: SiAndroidstudio,
      gradient: 'from-white to-green-500',
      color: '#22c55e',
      usage: 1,
      experience: 6,
    },
    {
      name: 'Ansible',
      icon: SiAnsible,
      gradient: 'from-red-500 to-white',
      usage: 2,
      experience: 4,
    },
    {
      name: 'General Networking',
      icon: FaNetworkWired,
      gradient: 'bg-gradient-to-r gradient-rainbow',
      usage: 2,
      experience: 5,
    },
    {
      name: 'Embedded Devices',
      icon: IoHardwareChip,
      gradient: 'bg-gradient-to-r gradient-rainbow',
      usage: 2,
      experience: 4,
    },
    {
      name: 'Hardware tinkering',
      icon: MdHardware,
      gradient: 'bg-gradient-to-r gradient-rainbow',
      usage: 3,
      experience: 5,
    },
    {
      name: 'UI/UX Design rules',
      icon: MdDesignServices,
      gradient: 'bg-gradient-to-r gradient-rainbow',
      usage: 2,
      experience: 4,
    },
  ];
  return (
    <div className="min-h-screen bg-zinc-800 text-white p-5 flex flex-col justify-between">
      <Head>
        <title>Maximilian Gaedig</title>
        <meta name="description" content="My info website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-xl">
        <h1 className="text-2xl font-bold text-center my-2">About me</h1>
        <p>
          Hi 👋, I&#39;m
          {' '}
          <span className="font-bold bg-gradient-to-r bg-clip-text text-transparent from-pink-500 via-purple-500 to-blue-500 animate-text">
            Maximilian Gaedig
          </span>
          <br />
          <br />
          I&#39;m currently a
          {' '}
          <span className="font-bold">
            Full Stack Developer / Software Engineer 🧑‍💻
          </span>
          {' '}
          based in
          {' '}
          <span className="font-bold bg-gradient-to-r bg-clip-text text-transparent from-white to-red-500 animate-text">
            Poznan, Poland
          </span>
          {' '}
          🇵🇱
          <br />
          <br />
          I love to code and create open source projects.
          <br />
          <br />
          I am proficient in
          {' '}
          <span className="font-bold">
            <TechnologyList technologies={skills.filter((skill) => skill.experience >= 7)} />
          </span>
          <br />
          <br />
          And have some experience with
          {' '}
          <span className="font-bold">
            <TechnologyList technologies={skills.filter((skill) => skill.experience < 7)} />
          </span>
          <br />
          <br />
          I like to
          {' '}
          costumize my own hardware/software,
          {' '}
          self-host services,
          {' '}
          tinker with my homelab,
          {' '}
          share my knowledge with the world,
          {' '}
          make new friends,
          {' '}
          and
          {' '}
          learn new things.
          <br />
          <br />
          <span className="font-bold">
            🚧 Website still under construction 🚧
          </span>
        </p>
        <h1 className="text-2xl font-bold text-center my-2">Ways to contact me</h1>
        <br />
        <div className="grid lg:grid-cols-3 gap-5">
          {accounts.map((account) => <AccountElement key={account.label} {...account} />)}
        </div>
      </main>
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
        </p>
      </footer>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const url = process.env.REDIS_HOST_URL;
  let views = '0';
  if (url) {
    try {
      const client = createClient({ url });
      await client.connect();
      await client.incr('views');
      const serverViews = await client.get('views');
      if (serverViews) views = serverViews;
    } catch (e) {
      console.error(e);
    }
  }
  return {
    props: { views },
  };
};
