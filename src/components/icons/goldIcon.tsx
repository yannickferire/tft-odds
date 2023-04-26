interface GoldIcon {
  color: string;
  size?: number;
}

const GoldIcon: React.FC<GoldIcon> = ({color, size = 3}) => {
  return (
    <svg className={`w-${size} fill-${color} inline-block`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.8 8.8">
      <g>
        <path d="M7.8,5.6c1.2-.3,2-1,2-1.8v-1.7c0-1.1-1.8-2.1-3.9-2.1S2,.9,2,2.1v1.1c-1.2,.4-2,1.1-2,1.8v1.7c0,1.2,1.8,2.1,3.9,2.1s3.9-1,3.9-2.1v-1.1Zm-5.4-.8c.7,.6,2,1.1,3.4,1.1h.4v.6c-.3,.2-1.1,.6-2.4,.6s-2.1-.4-2.4-.6v-1.3c.1-.1,.2-.1,.4-.2,.2-.1,.4-.1,.6-.2Z" />
      </g>
    </svg>
  )
}

export default GoldIcon;