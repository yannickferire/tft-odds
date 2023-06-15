import Image from "next/image";

interface ISpatulaIcon {
  className?: string;
  size?: number;
}

const SpatulaIcon: React.FC<ISpatulaIcon> = ({ className, size = 16 }) => {
  return (
    <Image className={className} src="/images/items/Spatula.png" alt="Spatula" width={size} height={size} />
  )
}

export default SpatulaIcon;