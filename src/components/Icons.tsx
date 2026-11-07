export function Brand({ light = false }: { light?: boolean }) {
  return (
    <img
      alt="MUTA"
      className="h-9 w-auto"
      height={36}
      src={light ? "/brand/muta-horizontal-crema.png" : "/brand/muta-horizontal-marron.png"}
      width={125}
    />
  );
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={diagonal ? "M6 18 18 6M9 6h9v9" : "M4 12h15M14 7l5 5-5 5"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Contours() {
  return (
    <svg className="h-full w-full" viewBox="0 0 800 650" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {[0, 1, 2, 3, 4, 5, 6].map((index) => (
        <path
          d={`M${-100 - index * 24} ${70 + index * 22}C80 ${-20 + index * 20} 250 ${110 + index * 15} 170 ${250 + index * 8}C90 ${390 + index * 4} 260 ${520 - index * 12} 430 ${420 - index * 10}C590 ${330 - index * 15} 660 ${130 + index * 8} 900 ${170 + index * 16}`}
          key={index}
          stroke="currentColor"
          strokeWidth="3"
        />
      ))}
      {[0, 1, 2, 3, 4].map((index) => (
        <path
          d={`M${240 + index * 22} 720C${160 + index * 20} 560 ${330 + index * 20} 500 ${470 + index * 12} 550C620 600 640 ${760 - index * 24} 770 820`}
          key={`b-${index}`}
          stroke="currentColor"
          strokeWidth="3"
        />
      ))}
    </svg>
  );
}
