import React from 'react';

interface BrandLogoProps {
  variant?: 'full' | 'horizontal' | 'emblem' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  onClick
}) => {
  // SVG emblem replicating the uploaded crest
  const renderEmblem = (dim: number) => (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200 group-hover:scale-[1.02]"
    >
      <defs>
        <linearGradient id="crestRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C01B1B" />
          <stop offset="100%" stopColor="#A81515" />
        </linearGradient>
        <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Outer Laurel Leaves Left */}
      <g fill="url(#crestRed)" opacity="0.95">
        <path d="M 44 140 C 35 130 30 115 28 100 C 34 104 38 112 40 120 Z" />
        <path d="M 33 124 C 24 114 21 100 22 86 C 28 92 33 99 33 107 Z" />
        <path d="M 28 104 C 20 92 19 76 23 63 C 28 70 32 78 30 87 Z" />
        <path d="M 30 80 C 24 67 27 52 35 41 C 38 49 40 58 36 67 Z" />
        <path d="M 40 58 C 36 46 42 33 53 25 C 53 34 52 44 46 51 Z" />
        <path d="M 58 38 C 58 27 68 18 80 14 C 77 23 73 31 64 36 Z" />
        <path d="M 52 154 C 42 147 36 137 36 128 C 42 133 48 141 52 148 Z" />
        <path d="M 68 166 C 58 162 49 155 46 148 C 53 151 61 157 66 163 Z" />
      </g>

      {/* Outer Laurel Leaves Right */}
      <g fill="url(#crestRed)" opacity="0.95">
        <path d="M 156 140 C 165 130 170 115 172 100 C 166 104 162 112 160 120 Z" />
        <path d="M 167 124 C 176 114 179 100 178 86 C 172 92 167 99 167 107 Z" />
        <path d="M 172 104 C 180 92 181 76 177 63 C 172 70 168 78 170 87 Z" />
        <path d="M 170 80 C 176 67 173 52 165 41 C 162 49 160 58 164 67 Z" />
        <path d="M 160 58 C 164 46 158 33 147 25 C 147 34 148 44 154 51 Z" />
        <path d="M 142 38 C 142 27 132 18 120 14 C 123 23 127 31 136 36 Z" />
        <path d="M 148 154 C 158 147 164 137 164 128 C 158 133 152 141 148 148 Z" />
        <path d="M 132 166 C 142 162 151 155 154 148 C 147 151 139 157 134 163 Z" />
      </g>

      {/* Inner Red Ring */}
      <circle
        cx="100"
        cy="96"
        r="68"
        stroke="url(#crestRed)"
        strokeWidth="6.5"
        fill="none"
      />

      {/* Upper Charcoal/Black Dynamic Arc */}
      <path
        d="M 68 56 C 88 38 124 38 144 76"
        stroke="#1F2937"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Roman Serif "1" */}
      <g fill="url(#crestRed)">
        {/* Top serif hook */}
        <polygon points="68,66 79,53 87,53 87,126 73,126 73,133 103,133 103,126 95,126 95,59 81,68" />
      </g>

      {/* Roman Serif "R" */}
      <g fill="url(#crestRed)">
        {/* Left vertical stem of R */}
        <polygon points="90,47 98,47 98,126 90,126 90,133 114,133 114,126 106,126 106,54 116,54 116,47" />
        {/* Bowl of R */}
        <path
          d="M 104 47 L 126 47 C 144 47 151 58 151 72 C 151 86 142 96 126 96 L 105 96 Z M 106 55 L 106 88 L 124 88 C 137 88 141 81 141 71 C 141 60 135 55 123 55 Z"
        />
        {/* Leg of R curving out and extending into the hand */}
        <path
          d="M 120 95 C 128 103 133 113 136 125 C 139 129 143 131 148 131 L 153 131 C 147 122 141 109 133 97 Z"
        />
      </g>

      {/* Crimson Cupped Hand holding House */}
      <path
        d="M 112 134 C 117 141 127 146 142 144 C 151 142 156 136 156 132 C 152 134 146 135 140 135 C 131 135 124 132 119 127 C 115 129 113 131 112 134 Z"
        fill="url(#crestRed)"
      />

      {/* House Icon nestled over hand (Pitched roof, chimney, walls, 4-pane window) */}
      <g stroke="#1F2937" strokeWidth="2.8" strokeLinejoin="round" fill="none">
        {/* Roof */}
        <polyline points="126,108 148,89 170,108" />
        {/* Chimney */}
        <polyline points="160,98 160,89 164,89 164,103" />
        {/* Walls & floor */}
        <rect x="133" y="108" width="30" height="23" strokeWidth="2.5" />
      </g>
      {/* 4 Window Panes */}
      <g fill="#1F2937">
        <rect x="142" y="112" width="4" height="4" />
        <rect x="148" y="112" width="4" height="4" />
        <rect x="142" y="118" width="4" height="4" />
        <rect x="148" y="118" width="4" height="4" />
      </g>

      {/* Bottom Laurel Base Arc */}
      <path
        d="M 80 174 C 92 178 108 178 120 174"
        stroke="url(#crestRed)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );

  // Size mapping
  const dimMap = {
    sm: 36,
    md: 46,
    lg: 64,
    xl: 96
  };

  const dim = dimMap[size];

  if (variant === 'emblem') {
    return (
      <div
        className={`inline-flex items-center justify-center ${onClick ? 'cursor-pointer' : ''} ${className}`}
        onClick={onClick}
        title="1st Response Home Clinic"
      >
        {renderEmblem(dim)}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div
        className={`inline-flex flex-col items-center text-center group ${onClick ? 'cursor-pointer' : ''} ${className}`}
        onClick={onClick}
      >
        {renderEmblem(size === 'sm' ? 60 : size === 'md' ? 84 : 120)}
        <div className="mt-3 flex flex-col items-center">
          <span className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#b91c1c] leading-none uppercase">
            1<span className="text-xl align-super font-bold">ST</span> RESPONSE
          </span>
          <div className="flex items-center gap-2 mt-1.5 text-xs lg:text-sm font-bold tracking-[0.2em] text-[#1f2937] uppercase">
            <span className="w-4 h-[1.5px] bg-[#1f2937]" />
            <span>HOME CLINIC</span>
            <span className="w-4 h-[1.5px] bg-[#1f2937]" />
          </div>
          <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold tracking-[0.25em] text-[#b91c1c] uppercase">
            <span className="w-6 h-[1px] bg-[#b91c1c]" />
            <span>LIMITED</span>
            <span className="w-6 h-[1px] bg-[#b91c1c]" />
          </div>
          <div className="flex items-center gap-2 mt-1 text-[11px] lg:text-xs italic text-slate-600 font-serif">
            <span className="w-3 h-[1px] bg-slate-400" />
            <span>Bring The Clinic To Your Home</span>
            <span className="w-3 h-[1px] bg-slate-400" />
          </div>
        </div>
      </div>
    );
  }

  // Horizontal variant (Ideal for Top Navbar)
  return (
    <div
      className={`inline-flex items-center gap-3 group select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {renderEmblem(dim)}
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline gap-1">
          <span className="text-base lg:text-lg font-extrabold tracking-tight text-[#b91c1c] leading-none uppercase">
            1<span className="text-xs align-super font-bold">ST</span> RESPONSE
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[10px] lg:text-[11px] font-bold tracking-widest text-[#1f2937] uppercase">
            HOME CLINIC
          </span>
          <span className="text-[9px] text-[#b91c1c] font-semibold tracking-wider uppercase">
            LTD
          </span>
        </div>
        <span className="text-[10px] italic text-slate-500 font-serif hidden sm:inline-block">
          Bring The Clinic To Your Home
        </span>
      </div>
    </div>
  );
};
