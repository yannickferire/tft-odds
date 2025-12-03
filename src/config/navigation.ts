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
        label: 'Augments Tier',
        href: '/augments/augments-tier'
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
  }
];
