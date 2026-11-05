export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand ${light ? "text-[#eee6d4]" : "text-[#4b4d35]"}`}>
      <svg className="h-8 w-8" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M5 7.5C5 5.6 6.6 4 8.5 4H22v12.3C22 19.5 19.5 22 16.3 22H4V8.5C4 8.1 4.4 7.7 5 7.5Z" fill="currentColor" />
        <path d="M26 4h13.5C41.4 4 43 5.6 43 7.5V12H30.8C28.1 12 26 14.1 26 16.8V4Z" fill="currentColor" />
        <path d="M43 16v10.5c0 1.9-1.6 3.5-3.5 3.5H26v-3.8c0-5.6 4.6-10.2 10.2-10.2H43Z" fill="currentColor" />
        <path d="M4 26h12.4c3.1 0 5.6 2.5 5.6 5.6V44H8.5A4.5 4.5 0 0 1 4 39.5V26Z" fill="currentColor" />
        <path d="M26 34h12.3c2.6 0 4.7 2.1 4.7 4.7v.8a4.5 4.5 0 0 1-4.5 4.5H26V34Z" fill="currentColor" />
      </svg>
      <span>MUTA</span>
    </span>
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
