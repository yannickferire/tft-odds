import { useQuery } from 'react-query';
import { fetchItems } from '@/utils/fetchItems';
import { Item } from '@/types/item';

interface UseItemsDataReturn {
  allItems: Item[];
  components: Item[];
  completedItems: Item[];
  consumables: Item[];
  supports: Item[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * React Query hook for fetching and caching TFT items data
 *
 * Cache strategy:
 * - Stale time: 1 hour (data considered fresh for this duration)
 * - Cache time: 24 hours (data kept in cache even if unused)
 */
export function useItemsData(): UseItemsDataReturn {
  const { data, isLoading, error } = useQuery('tft-items-data', fetchItems, {
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    allItems: data?.allItems || [],
    components: data?.components || [],
    completedItems: data?.completedItems || [],
    consumables: data?.consumables || [],
    supports: data?.supports || [],
    isLoading,
    error: error as Error | null,
  };
}
