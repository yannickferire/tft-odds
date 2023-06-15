import Image from "next/image";

interface IRemoverIcon {
  className?: string;
  size?: number;
}

const RemoverIcon: React.FC<IRemoverIcon> = ({ className, size = 16 }) => {
  return (
    <Image className={className} src="/images/items/remover.webp" alt="Magnetic Remover" width={size} height={size} />
  )
}

export default RemoverIcon;