import { FC } from 'react';
import {
  autoUpdate, inline, shift, useFloating,
} from '@floating-ui/react-dom';

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
const TechnologyComponent: FC<Technology> = ({
  name, icon, gradient, color, usage, experience,
}) => {
  const {
    x, y, reference, floating, strategy,
  } = useFloating({
    placement: 'top',
    middleware: [inline(), shift()],
    whileElementsMounted: autoUpdate,
  });
  return (
    <span key={name}>
      <span className="group">
        <span
          className="invisible group-hover:visible bg-zinc-700 py-0.5 px-2 rounded-md text-center"
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          role="tooltip"
        >
          Usage:
          {' '}
          {usageFrequency[usage] || 'Unknown'}
          ,
          {' '}
          Experience:
          {' '}
          {experience}
        </span>
        <span
          className={typeof gradient !== 'undefined' ? `font-bold bg-gradient-to-r bg-clip-text text-transparent ${gradient} animate-text` : ''}
          ref={reference}
        >
          {name}
        </span>
      </span>
      {' '}
      {icon({ className: 'inline', color })}
      ,
      {' '}
    </span>
  );
};

TechnologyComponent.defaultProps = {
  gradient: undefined,
  color: undefined,
};

const TechnologyList: FC<Props> = ({ technologies }) => (
  <>
    {technologies.map(({
      name, icon, color, gradient, usage, experience,
    }) => (
      <TechnologyComponent
        key={name}
        name={name}
        icon={icon}
        color={color}
        gradient={gradient}
        usage={usage}
        experience={experience}
      />
    ))}
  </>
);

export default TechnologyList;
