import React, { useState } from "react";
import Image from "next/image";
import { useQuery } from "react-query";
import { fetchChampions } from "@/utils/fetchChampions";

interface FormatChampionsProps {
  value: string; // Nom du champion (ex. "Heimerdinger")
}

export function FormatChampions({ value }: FormatChampionsProps) {
  const [champion, setChampion] = useState<any | null>(null);

  // Fetch champions data
  const { data } = useQuery("champions", fetchChampions);

  // Update champion when data is available
  React.useEffect(() => {
    if (data?.champions) {
      const foundChampion = data.champions.find(
        (champ: any) => champ.name.trim().toLowerCase() === value.trim().toLowerCase()
      );
      setChampion(foundChampion);
    }
  }, [data, value]);

  // Check if this is "None" encounter (no champion)
  const isNone = value.trim().toLowerCase() === "none";

  return (
    <div className="flex items-center">
      <div className="w-12 h-12 relative rounded-full border-2 mr-2 border-midday overflow-hidden flex items-center justify-center">
        {champion ? (
          <Image
            src={champion.image}
            alt={champion.name}
            width={48}
            height={48}
          />
        ) : isNone ? (
          <div className="w-full h-full bg-crema/20" />
        ) : (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white/80 rounded-full animate-spin" />
        )}
      </div>
      <span className="font-medium">{champion ? champion.name : value}</span>
    </div>
  );
}