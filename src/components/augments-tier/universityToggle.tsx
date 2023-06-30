import Image from 'next/image';

interface IUniversityToggle{
  slotsTier: string[];
  setSlotsTier: (tier: string[]) => void;
  university: boolean;
  setUniversity: (university: boolean) => void;
}

const UniversityToggle: React.FC<IUniversityToggle> = ({ slotsTier, setSlotsTier, university, setUniversity }) => {
  const handlePortalSelect = () => {
    setUniversity(!university);
    /* if university is set to true, then setSlotsTier first data equal to "*" and the rest of the data stays the same */
    if (university === false) {
      setSlotsTier(["*", ...slotsTier.slice(1)]);
    } else {
      setSlotsTier(["", "", ""]);
    }
  }
  return (
    <div onClick={() => handlePortalSelect()} className={`flex self-start gap-2 items-center ${university === true ? "opacity-100 hover:opacity-100 cursor-pointer":"opacity-40 hover:opacity-100 cursor-pointer"}`}>
      <Image src="https://raw.communitydragon.org/latest/game/assets/ux/traiticons/trait_icon_9_piltover.tft_set9.png" width="24" height="24" alt="Piltover" />
      <div className="flex flex-col">
        <p className="text-sm">The University</p>
        <p className="text-xs">The first augment offered this game will be prismatic.</p>
      </div>
    </div>
  )
}

export default UniversityToggle;