import { FC } from 'react';

export interface Technology {
  name: string;
  icon: FC;
  gradient?: string;
  color?: string;
}
export interface Props {
  technologies: Technology[];
}

const TechnologyList: FC<Props> = ({ technologies }) => (
  <>
    {technologies.map(({
      name, icon, color, gradient,
    }) => (
      <>
        <span className={typeof gradient !== 'undefined' ? `font-bold bg-gradient-to-r bg-clip-text text-transparent ${gradient} animate-text` : ''}>
          {name}
        </span>
        {' '}
        {icon({ className: 'inline', color })}
        ,
        {' '}
      </>
    ))}
  </>
);

export default TechnologyList;
