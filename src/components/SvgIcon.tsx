import { IconMap, IconSizes, type IconMapTypes, type IconSizeTypes } from "../assets/icons/icons";
import React from "react";

interface SVGIconProps {
  icon: IconMapTypes;
  size?: IconSizeTypes;
  className?: string;
}

const SvgIcon: React.FC<SVGIconProps> = ({
  icon,
  size = "lg",
  className,
}: SVGIconProps) => {
  const Icon = IconMap[icon as IconMapTypes];

  return (
    <Icon
      className={className}
      width={IconSizes[size]}
      height={IconSizes[size]}
    />
  );
};

export default SvgIcon;