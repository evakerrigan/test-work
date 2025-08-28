import ContractorSvg from '@/assets/icons/Contractor.svg?react';

interface ContractorIconProps {
  size?: number;
  className?: string;
}

export const ContractorIcon = ({
  size = 16,
  className,
}: ContractorIconProps) => {
  return <ContractorSvg width={size} height={size} className={className} />;
};
