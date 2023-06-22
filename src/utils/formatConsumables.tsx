import GoldIcon from '@/components/icons/goldIcon';
import SpatulaIcon from "@/components/icons/spatulaIcon";
import ThiefsGlovesIcon from "@/components/icons/thiefsglovesIcon";
import TacticianCrownIcon from "@/components/icons/tacticianCrownIcon";
import RemoverIcon from "@/components/icons/remover";
import ReforgerIcon from "@/components/icons/reforger";
import DuplicatorIcon from "@/components/icons/duplicator";

export function formatConsumables(value: any) {
  const formattedValue = value
    .replace(/Gold/g, '<GoldIcon />')
    .replace(/Spatula/g, '<SpatulaIcon />')
    .replace(/Radiant Thief's Gloves/g, '<RadiantThiefsGlovesIcon />')
    .replace(/Thief's Gloves/g, '<ThiefsGlovesIcon />')
    .replace(/Tactician's Crown/g, '<TacticianCrownIcon />')
    .replace(/Remover/g, '<RemoverIcon />')
    .replace(/Reforger/g, '<ReforgerIcon />')
    .replace(/Champion Duplicator/g, '<DuplicatorIcon />')
    .replace(/(\d+) cost/g, '<span className="text-$1cost">$1 cost</span>');

  const parts = formattedValue.match(
    /(<GoldIcon \/>)|(<SpatulaIcon \/>)|(<RadiantThiefsGlovesIcon \/>)|(<ThiefsGlovesIcon \/>)|(<TacticianCrownIcon \/>)|(<RemoverIcon \/>)|(<ReforgerIcon \/>)|(<DuplicatorIcon \/>)|<span className="text-(\d+)cost">([^<]+)<\/span>|([^<]+)/g
  );

  return parts.map((part: any, index: any) => {
    if (part === '<GoldIcon />') {
      return <GoldIcon key={index} color="crema" size={3} />;
    } else if (part === '<SpatulaIcon />') {
      return (
        <span key={index}>
          <SpatulaIcon size={20} className="inline-block ml-1 -mt-1 mr-1 border border-midday box-border" />
          Spatula
        </span>
      );
    } else if (part === '<RadiantThiefsGlovesIcon />') {
      return (
        <span key={index}>
          <ThiefsGlovesIcon size={20} className="inline-block ml-1 -mt-1 mr-1.5 border border-gold box-border" />
          Radiant Thief&apos;s Gloves
        </span>
      );
    } else if (part === '<ThiefsGlovesIcon />') {
      return (
        <span key={index}>
          <ThiefsGlovesIcon size={20} className="inline-block ml-1 -mt-1 mr-1.5 border border-midday box-border" />
          Thief&apos;s Gloves
        </span>
      );
    } else if (part === '<TacticianCrownIcon />') {
      return (
        <span key={index}>
          <TacticianCrownIcon size={20} className="inline-block ml-1 -mt-1 mr-1 border border-midday box-border" />
          Tactician&apos;s Crown
        </span>
      );
    } else if (part === '<RemoverIcon />') {
      return (
        <span key={index}>
          <RemoverIcon size={20} className="inline-block ml-1 -mt-1 mr-1 border border-midday box-border" />
          Remover
        </span>
      );
    } else if (part === '<ReforgerIcon />') {
      return (
        <span key={index}>
          <ReforgerIcon size={20} className="inline-block ml-1 -mt-1 mr-1 border border-midday box-border" />
          Reforger
        </span>
      );
    } else if (part === '<DuplicatorIcon />') {
      return (
        <span key={index}>
          <DuplicatorIcon size={20} className="inline-block ml-1 -mt-1 mr-1 border border-midday box-border" />
          Champion Duplicator
        </span>
      );
    } else if (/^<span className="text-(\d+)cost">(\d+) cost<\/span>$/.test(part)) {
      const cost = part.match(/^<span className="text-(\d+)cost">(\d+) cost<\/span>$/)[1];
      return <span key={index} className={`text-${cost}cost`}>{cost} cost</span>;
    } else {
      return part;
    }
  });
}