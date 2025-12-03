import { useQuery } from 'react-query';
import { fetchChampionsURL } from '@/constants/set';

/**
 * Fetches the complete TFT data from Community Dragon API
 * This includes all sets, champions, traits, items, augments, etc.
 */
async function fetchCompleteTFTData() {
  const response = await fetch(fetchChampionsURL);
  if (!response.ok) {
    throw new Error('Failed to fetch TFT data');
  }
  return response.json();
}

/**
 * React Query hook to fetch and cache complete TFT data
 * Data will be visible in React Query DevTools
 */
export function useTFTData() {
  return useQuery('tft-complete-data', fetchCompleteTFTData, {
    staleTime: 1000 * 60 * 60, // 1 hour - data doesn't change often
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
