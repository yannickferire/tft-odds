export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export const navigationConfig: NavigationItem[] = [
  {
    label: 'Rolling odds tool',
    href: '/rolling-odds'
  },
  {
    label: 'Encounters',
    href: '/encounters'
  },
  {
    label: 'Augments',
    href: '/augments',
    children: [
      {
        label: 'Augments Simulator',
        href: '/augments/augments-simulator'
      },
      {
        label: 'Augments Distribution',
        href: '/augments/augments-distribution'
      },
      {
        label: 'Augments Tables',
        href: '/augments/augments-tables'
      }
    ]
  },
  {
    label: 'Traits',
    href: '/traits',
    children: [
      {
        label: 'Ixtal Cashout',
        href: '/traits/ixtal-cashout'
      },
      {
        label: 'Yordle Bags',
        href: '/traits/yordle-bags'
      }
    ]
  },
  {
    label: 'Data',
    href: '/data',
    children: [
      {
        label: 'Shops Odds',
        href: '/data/shops-odds'
      }
    ]
  }
];
