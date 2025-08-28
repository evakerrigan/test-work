import SignOutSvg from '@/assets/icons/SignOut.svg?react';

interface SignOutIconProps {
  size?: number;
  className?: string;
}

export const SignOutIcon = ({ size = 20, className }: SignOutIconProps) => {
  return <SignOutSvg width={size} height={size} className={className} />;
};
