import SettingsSvg from '@/assets/icons/Settings.svg?react';

interface SettingsIconProps {
  size?: number;
  className?: string;
}

export const SettingsIcon = ({ size = 20, className }: SettingsIconProps) => {
  return <SettingsSvg width={size} height={size} className={className} />;
};
