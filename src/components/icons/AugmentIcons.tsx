export const SilverIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L2 9V23L16 30L30 23V9L16 2Z" fill="#C0C0C0" stroke="#E0E0E0" strokeWidth="2" />
    <path d="M16 6L6 11V21L16 26L26 21V11L16 6Z" fill="#A0A0A0" fillOpacity="0.5" />
  </svg>
);

export const GoldIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L2 9V23L16 30L30 23V9L16 2Z" fill="#FFD700" stroke="#FFFACD" strokeWidth="2" />
    <path d="M16 6L6 11V21L16 26L26 21V11L16 6Z" fill="#DAA520" fillOpacity="0.5" />
  </svg>
);

export const PrismIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L2 9V23L16 30L30 23V9L16 2Z" fill="url(#prism_gradient)" stroke="#E0FFFF" strokeWidth="2" />
    <defs>
      <linearGradient id="prism_gradient" x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF0000" />
        <stop offset="20%" stopColor="#FFFF00" />
        <stop offset="40%" stopColor="#00FF00" />
        <stop offset="60%" stopColor="#00FFFF" />
        <stop offset="80%" stopColor="#0000FF" />
        <stop offset="100%" stopColor="#FF00FF" />
      </linearGradient>
    </defs>
  </svg>
);
