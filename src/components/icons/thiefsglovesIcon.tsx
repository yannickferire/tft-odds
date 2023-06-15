import Image from "next/image";

interface IThiefsGlovesIcon {
  className?: string;
  size?: number;
}

const ThiefsGlovesIcon: React.FC<IThiefsGlovesIcon> = ({ className, size = 16 }) => {
  return (
    <Image className={className} src="/images/items/ThiefsGloves.png" alt="Thief's Gloves" width={size} height={size} />
  )
}

export default ThiefsGlovesIcon;