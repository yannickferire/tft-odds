import Image from "next/image";

interface IReforgerIcon {
  className?: string;
  size?: number;
}

const ReforgerIcon: React.FC<IReforgerIcon> = ({ className, size = 16 }) => {
  return (
    <Image className={className} src="/images/items/reforger.webp" alt="Reforger" width={size} height={size} />
  )
}

export default ReforgerIcon;