export {
  IconPlayButton,
  IconPauseButton,
  IconPreviousButton,
  IconNextButton,
  IconRepeatButton,
  IconShuffleButton,
  IconFavoriteButton,
  IconTrackListButton,
  IconShareButton,
};

const IconPlayButton = ({ size = 36 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
    <polygon
      points="8,5 8,19 19,12"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const IconPauseButton = ({ size = 36 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
    <rect
      x="6"
      y="5"
      width="2.5"
      height="14"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      rx="1"
      ry="1"
    />
    <rect
      x="14"
      y="5"
      width="2.5"
      height="14"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      rx="1"
      ry="1"
    />
  </svg>
);

const IconPreviousButton = ({ size = 36 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M6 6h2v12H6zM18 6l-10 6 10 6z" fill="currentColor" />
  </svg>
);

const IconNextButton = ({ size = 36 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M16 6h2v12h-2zM6 6l10 6L6 18z" fill="currentColor" />
  </svg>
);

//

const IconRepeatButton = ({ mode = "off", size = 36 }) => {
  // mode: "off", "one", "all"
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"
        fill={mode !== "off" ? "#0d6fa6" : "currentColor"}
      />
      {mode === "one" && (
        <text
          x="18" // adjust to position the "1" nicely
          y="20"
          fontSize="8" // smaller to fit inside 24x24
          fill="#0d6fa6"
          fontWeight="bold"
          fontFamily="Arial, sans-serif"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          1
        </text>
      )}
    </svg>
  );
};

const IconShuffleButton = ({ active, size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={active ? "#0d6fa6" : "currentColor"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Main upper left to lower right path */}
    <path d="M4 18C10 18 14 6 20 6" />
    {/* Arrowhead top right */}
    <polygon
      points="20,6 17,4 18,8"
      fill={active ? "#0d6fa6" : "currentColor"}
    />
    {/* Main lower left to upper right path */}
    <path d="M4 6C7.5 6 10.5 14 14 17C16.5 19.5 18.5 18 20 18" />
    {/* Arrowhead bottom right */}
    <polygon
      points="20,18 17,16 18,20"
      fill={active ? "#0d6fa6" : "currentColor"}
    />
  </svg>
);

const IconFavoriteButton = ({ filled, size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconTrackListButton = ({ size = 36, active = false }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
    <rect
      x="4"
      y="6"
      width="16"
      height="2"
      rx="1"
      fill={active ? "#0d6fa6" : "currentColor"}
    />
    <rect
      x="4"
      y="11"
      width="16"
      height="2"
      rx="1"
      fill={active ? "#0d6fa6" : "currentColor"}
    />
    <rect
      x="4"
      y="16"
      width="12"
      height="2"
      rx="1"
      fill={active ? "#0d6fa6" : "currentColor"}
    />
  </svg>
);

// export const IconAddToQueueButton = ({ size = 36 }) => (
//   <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
//     {/* Queue list lines */}
//     <rect x="6" y="7" width="12" height="2" rx="1" fill="currentColor" />
//     <rect x="6" y="11" width="12" height="2" rx="1" fill="currentColor" />
//     {/* Plus symbol */}
//     <rect x="17" y="15" width="6" height="2" rx="1" fill="currentColor" />
//     <rect x="20" y="12" width="2" height="6" rx="1" fill="currentColor" />
//   </svg>
// );

const IconShareButton = ({ size = 36 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
    {/* Three dots */}
    <circle cx="18" cy="5" r="2" fill="currentColor" />
    <circle cx="6" cy="12" r="2" fill="currentColor" />
    <circle cx="18" cy="19" r="2" fill="currentColor" />
    {/* Curved lines connecting dots */}
    <path
      d="M8 12.5c2.5-.5 5.5-5.5 8-6.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M8 11.5c2.5.5 5.5 5.5 8 6.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);
