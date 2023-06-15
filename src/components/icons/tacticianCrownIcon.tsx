import Image from "next/image";

interface ITacticianCrownIcon {
  className?: string;
  size?: number;
}

const TacticianCrownIcon: React.FC<ITacticianCrownIcon> = ({ className, size = 16 }) => {
  return (
    <Image className={className} src="/images/items/ForceofNature.png" alt="Tactician Crown" width={size} height={size} />
  )
}

export default TacticianCrownIcon;