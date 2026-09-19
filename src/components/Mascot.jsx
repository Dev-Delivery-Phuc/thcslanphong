// "Khiên" – linh vật của app. mood: happy | wow | oops | think
const MOUTHS = {
  happy: <path d="M46 82 Q60 95 74 82" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />,
  wow: <path d="M45 79 Q60 104 75 79 Z" fill="var(--ink)" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />,
  oops: <ellipse cx="60" cy="87" rx="6" ry="7" fill="var(--ink)" />,
  think: <path d="M50 87 H70" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />,
};

export default function Mascot({ size = 120, mood = 'happy', className = '' }) {
  return (
    <svg
      className={`mascot ${className}`}
      width={size}
      height={size * 1.25}
      viewBox="0 -12 120 150"
      role="img"
      aria-label="Khiên, linh vật của bài học"
    >
      <path
        d="M60 8 C60 -4 72 -10 84 -8 C82 2 72 8 60 8 Z"
        fill="var(--mint)"
        stroke="var(--ink)"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M60 8 L108 22 V62 C108 97 86 121 60 134 C34 121 12 97 12 62 V22 Z"
        fill="var(--green)"
        stroke="var(--ink)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M24 30 L60 19 V122 C40 111 24 92 24 64 Z" fill="#fff" opacity="0.18" />
      <circle cx="44" cy="62" r="6.5" fill="var(--ink)" />
      <circle cx="76" cy="62" r="6.5" fill="var(--ink)" />
      <circle cx="46" cy="60" r="2" fill="#fff" />
      <circle cx="78" cy="60" r="2" fill="#fff" />
      <circle cx="33" cy="79" r="6" fill="#ffb3ba" opacity="0.9" />
      <circle cx="87" cy="79" r="6" fill="#ffb3ba" opacity="0.9" />
      {MOUTHS[mood] ?? MOUTHS.happy}
    </svg>
  );
}
