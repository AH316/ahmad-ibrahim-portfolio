import { IconType } from 'react-icons';
import {
  GiSwordsPower,
  GiShield,
  GiTowerFlag,
  GiScrollUnfurled,
  GiRing,
  GiCastle,
  GiCrownedSkull,
  GiTreeBranch
} from 'react-icons/gi';

interface IconProps {
  type: 'sword' | 'shield' | 'tower' | 'scroll' | 'ring' | 'castle' | 'crown' | 'tree';
  className?: string;
  size?: number;
}

const iconMap: Record<string, IconType> = {
  sword: GiSwordsPower,
  shield: GiShield,
  tower: GiTowerFlag,
  scroll: GiScrollUnfurled,
  ring: GiRing,
  castle: GiCastle,
  crown: GiCrownedSkull,
  tree: GiTreeBranch,
};

export default function Icon({ type, className = '', size = 24 }: IconProps) {
  const IconComponent = iconMap[type];

  return (
    <IconComponent
      size={size}
      className={`text-gondor-gold ${className}`}
      data-testid={`lotr-icon-${type}`}
    />
  );
}
