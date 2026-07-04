import React from "react";

const SpeeshTextLogo = ({
  width,
  height,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 430 120"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="92"
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontWeight="800"
        fontSize="110"
        letterSpacing="-4"
        className="fill-text"
      >
        Speesh
      </text>
    </svg>
  );
};

export default SpeeshTextLogo;
