/**
 * Yordle Grab bag (8 Yordle)
 */
export interface YordleGrabBag {
  probability: number;
  probabilityPercent: string;
  rewards: string[];
}

export const yordleGrabBag: YordleGrabBag[] = [
  {
    probability: 0.25,
    probabilityPercent: "25%",
    rewards: ["2x 3 Cost Yordle"]
  },
  {
    probability: 0.25,
    probabilityPercent: "25%",
    rewards: ["6x Gold"]
  },
  {
    probability: 0.17,
    probabilityPercent: "16.6%",
    rewards: ["1x Lesser Champion Duplicator"]
  },
  {
    probability: 0.17,
    probabilityPercent: "16.6%",
    rewards: ["1x 4 Cost Yordle"]
  },
  {
    probability: 0.17,
    probabilityPercent: "16.6%",
    rewards: ["1x Item Component"]
  }
];
