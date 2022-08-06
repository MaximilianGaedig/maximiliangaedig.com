import { FC } from 'react';

export interface Props {
  href: string,
  label: string,
  icon: FC,
  account: string,
}

const AccountElement: FC<Props> = ({
  href, label, icon, account,
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-center flex flex-col items-center max-w-1/4 p-5 gap-2 rounded-xl bg-zinc-900 hover:bg-zinc-600 drop-shadow-lg">
    <h2 className="text-bold">{label}</h2>
    {icon({ className: 'h-20 w-full' })}
    <h3 className="text-bold">{account}</h3>
  </a>
);
export default AccountElement;
