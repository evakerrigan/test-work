import OrganizationSvg from '@/assets/icons/Organization.svg?react';

interface OrganizationIconProps {
  size?: number;
  className?: string;
}

export const OrganizationIcon = ({
  size = 16,
  className,
}: OrganizationIconProps) => {
  return <OrganizationSvg width={size} height={size} className={className} />;
};
