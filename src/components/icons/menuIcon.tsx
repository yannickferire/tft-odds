interface IMenuIcon {
  color: string;
  size?: number;
}

const MenuIcon: React.FC<IMenuIcon> = ({color, size = 3}) => {
  return (
    <svg className={`w-${size} fill-${color} inline-block`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
  )
}

export default MenuIcon;