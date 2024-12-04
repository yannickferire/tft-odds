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
        (champ: any) => champ.name.toLowerCase() === value.toLowerCase()
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

  if (!champion) {
    return <span>{value}</span>;
  }

  return (
    <div className="flex items-center">
      <div className="w-12 h-12 relative rounded-full border-2 mr-2 border-midday overflow-hidden">
      <Image
        src={champion.image}
        alt={champion.name}
        width={48}
        height={48}
        className="max-w-none w-16 h-16 aspect-square absolute right-0 top-1/2 -translate-y-1/2 mt-2"
      />
      </div>
      <span className="font-medium">{champion.name}</span>
    </div>
  );
}