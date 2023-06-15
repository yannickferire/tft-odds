import Image from "next/image";

interface IDuplicatorIcon {
  className?: string;
  size?: number;
}

const DuplicatorIcon: React.FC<IDuplicatorIcon> = ({ className, size = 16 }) => {
  return (
    <Image className={className} src="/images/items/duplicator.webp" alt="Champion Duplicator" width={size} height={size} />
  )
}

export default DuplicatorIcon;