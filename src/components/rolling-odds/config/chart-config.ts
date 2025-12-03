import { ChartConfig } from '@/components/ui/chart';

/**
 * Chart configuration for rolling odds visualization
 */
export const chartConfig = {
  probability: {
    label: '1 Star',
    color: '#9f561b' // bronze color for 1 star
  },
  probability2Star: {
    label: '2 Star',
    color: '#b5cbde' // silver color for 2 star
  },
  probability3Star: {
    label: '3 Star',
    color: '#f9be0a' // gold color for 3 star
  },
} satisfies ChartConfig;

/**
 * Chart margins configuration
 */
export const chartMargins = {
  top: 25,
  right: 25,
  left: 0,
  bottom: 25,
};

/**
 * Chart dimensions configuration
 */
export const chartDimensions = {
  height: 360,
} as const;
