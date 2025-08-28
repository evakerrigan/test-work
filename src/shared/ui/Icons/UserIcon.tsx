import UserSvg from '@/assets/icons/User.svg?react';

interface UserIconProps {
  size?: number;
  className?: string;
}

export const UserIcon = ({ size = 16, className }: UserIconProps) => {
  return <UserSvg width={size} height={size} className={className} />;
};
