import CompanySvg from '@/assets/icons/Company.svg?react';

interface CompanyIconProps {
  size?: number;
  className?: string;
}

export const CompanyIcon = ({ size = 16, className }: CompanyIconProps) => {
  return <CompanySvg width={size} height={size} className={className} />;
};
