export interface CarouselOdd {
  probability: number;
  probabilityPercent: string;
  rewards: string[];
}

export interface CarouselStageData {
  stage: string;
  notes?: string;
  odds: CarouselOdd[];
}

export const carouselOdds: CarouselStageData[] = [
  {
    stage: "Stage 2, 3 & 4",
    odds: [
      {
        probability: 0.82,
        probabilityPercent: "82%",
        rewards: ["1x Every component", "1x Random component"]
      },
      {
        probability: 0.15,
        probabilityPercent: "15%",
        rewards: ["1x Every component", "1x Spatula / Frying Pan"]
      },
      {
        probability: 0.03,
        probabilityPercent: "3%",
        rewards: ["6x Random component", "3x Spatula / Frying Pan"]
      }
    ]
  },
  {
    stage: "Stage 5",
    odds: [
      {
        probability: 0.2504,
        probabilityPercent: "25.4%",
        rewards: ["9x Random completed item"]
      },
      {
        probability: 0.25,
        probabilityPercent: "25%",
        rewards: ["9x Random unbuilt completed item"]
      },
      {
        probability: 0.24,
        probabilityPercent: "24%",
        rewards: ["7x Completed item", "1x Spatula Emblem", "1x Frying Pan Emblem", "(all built from same base component)"]
      },
      {
        probability: 0.15,
        probabilityPercent: "15%",
        rewards: ["7x Random unbuilt completed item", "2x Random Emblem"]
      },
      {
        probability: 0.10,
        probabilityPercent: "10%",
        rewards: ["6x Random unbuilt completed item", "3x Random Emblem"]
      },
      {
        probability: 0.006,
        probabilityPercent: "0.6%",
        rewards: ["3x Tactician's Crown", "3x Tactician's Cape", "3x Tactician's Shield"]
      },
    ]
  },
  {
    stage: "Stage 6",
    odds: [
      {
        probability: 0.50,
        probabilityPercent: "50%",
        rewards: ["5x Random unbuilt completed item", "4x Random component (including Spatula / Frying Pan)"]
      },
      {
        probability: 0.25,
        probabilityPercent: "25%",
        rewards: ["9x Random unbuilt completed item"]
      },
      {
        probability: 0.15,
        probabilityPercent: "15%",
        rewards: ["7x Random unbuilt completed item", "2x Random Emblem"]
      },
      {
        probability: 0.10,
        probabilityPercent: "10%",
        rewards: ["6x Random unbuilt completed item", "3x Random Emblem"]
      },
    ]
  }
];
