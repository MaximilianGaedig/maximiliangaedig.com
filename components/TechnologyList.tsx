import { FC } from 'react';

export interface Technology {
  name: string;
  icon: FC;
  gradient?: string;
  color?: string;
  usage: number;
  experience: number;
}
export interface Props {
  technologies: Technology[];
}
const usageFrequency: { [key: number]: string } = {
  0: 'Almost never',
  1: 'Rarely',
  2: 'Sometimes',
  3: 'Often',
  4: 'Almost daily',
};
const TechnologyList: FC<Props> = ({ technologies }) => (
  <>
    {technologies.map(({
      name, icon, color, gradient, usage, experience,
    }) => (
      <span key={name}>
        <span className="group">
          <span className="absolute hidden invisible md:group-hover:visible -mt-12 bg-zinc-700 py-0.5 px-2 rounded-md text-center">
            Usage:
            {' '}
            {usageFrequency[usage] || 'Unknown'}
            ,
            {' '}
            Experience:
            {' '}
            {experience}
          </span>
          <span className={typeof gradient !== 'undefined' ? `font-bold bg-gradient-to-r bg-clip-text text-transparent ${gradient} animate-text` : ''}>
            {name}
          </span>
        </span>
        {' '}
        {icon({ className: 'inline', color })}
        ,
        {' '}
      </span>
    ))}
  </>
);

export default TechnologyList;
