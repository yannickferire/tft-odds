import Image from "next/image";

interface IItem {
  name?: string;
  className?: string;
  size?: number;
}

const Item: React.FC<IItem> = ({ className, size = 16 }) => {
  return (
    <Image className={className} src="/images/items/duplicator.webp" alt="Champion Duplicator" width={size} height={size} />
  )
}

export default Item;