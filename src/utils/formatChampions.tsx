import React, { useState } from "react";
import Image from "next/image";
import { useQuery } from "react-query";
import { fetchChampions } from "@/utils/fetchChampions";

interface FormatChampionsProps {
  value: string; // Nom du champion (ex. "Heimerdinger")
}

export function FormatChampions({ value }: FormatChampionsProps) {
  const [champion, setChampion] = useState<any | null>(null);

  // Fetch des champions avec React Query
  const { isLoading, error } = useQuery("champions", fetchChampions, {
    onSuccess: (data) => {
      // Recherche du champion correspondant à "value"
      const foundChampion = data.champions.find(
        (champ: any) => champ.name.trim().toLowerCase() === value.trim().toLowerCase()
      );
      setChampion(foundChampion);
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error loading champions.</span>;
  }

  return (
    <div className="flex items-center">
      <div className="w-12 h-12 relative rounded-full border-2 mr-2 border-midday overflow-hidden">
        {champion ? (
          <Image
            src={champion.image}
            alt={champion.name}
            width={48}
            height={48}
          />
        ) : (
          <div className="w-full h-full bg-white/10" />
        )}
      </div>
      <span className="font-medium">{champion ? champion.name : value}</span>
    </div>
  );
}