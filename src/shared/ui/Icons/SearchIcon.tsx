import SearchSvg from '@/assets/icons/Search.svg?react';

interface SearchIconProps {
  size?: number;
  className?: string;
}

export const SearchIcon = ({ size = 20, className }: SearchIconProps) => {
  return <SearchSvg width={size} height={size} className={className} />;
};
