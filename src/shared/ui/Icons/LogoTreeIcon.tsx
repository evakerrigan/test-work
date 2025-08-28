import LogoTreeSvg from '@/assets/icons/LogoTree.svg?react';

interface LogoTreeIconProps {
  size?: number;
  className?: string;
}

export const LogoTreeIcon = ({ size = 36, className }: LogoTreeIconProps) => {
  return <LogoTreeSvg width={size} height={size} className={className} />;
};
