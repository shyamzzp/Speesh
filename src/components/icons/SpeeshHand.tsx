const SpeeshHand = ({
  width,
  height,
}: {
  width?: number | string;
  height?: number | string;
}) => (
  <svg
    width={width || 120}
    height={height || 120}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="speesh-s-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8B5CF6" />
        <stop offset="1" stopColor="#22D3EE" />
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="92" height="92" rx="22" fill="#111827" />
    <text
      x="50"
      y="53"
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
      fontWeight="800"
      fontSize="66"
      fill="url(#speesh-s-grad)"
    >
      S
    </text>
  </svg>
);

export default SpeeshHand;
