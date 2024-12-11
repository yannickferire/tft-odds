import React from "react";

interface ITip {
  className?: string;
  children: React.ReactNode;
}

const Tip: React.FC<ITip> = ({ className, children }) => {
  return (
    <p className="text-sm rounded-sm bg-morning/60 text-crema px-2 py-0.5 inline-block w-fit mx-auto mb-6">⚡ Tip: {children}</p>
  )
}

export default Tip;