export function GlobalBackground() {
  const COLORS = {
    // Soft, airy, feminine background using lavender/blush and champagne tones
    background: [
      "#FDFBFE", // Soft snow white with a hint of purple
      "#F8F2F9", // Soft lavender blush
      "#FFFBF2", // Soft warm champagne/cream
      "#F8F2F9", // Soft lavender blush
      "#FDFBFE", // Soft snow white
    ],
    // Primary brand colors for the floating blobs
    blob1: "rgba(128, 0, 128, 1)", // Patriarch Purple
    blob2: "rgba(255, 206, 27, 1)", // Mustard Yellow
  };

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--background)]"
    >
      {/* Base Gradient */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(160deg, ${COLORS.background[0]} 0%, ${COLORS.background[1]} 25%, ${COLORS.background[2]} 50%, ${COLORS.background[3]} 75%, ${COLORS.background[4]} 100%)`,
        }}
      />

      {/* Blob 1 - Purple (Wisdom, Transformation) */}
      <div
        className="absolute -top-[20%] -left-[10%] h-[800px] w-[800px]
                   animate-float-slow rounded-full opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(circle, ${COLORS.blob1} 0%, transparent 70%)`,
          filter: "blur(90px)",
        }}
      />

      {/* Blob 2 - Yellow (Happiness, Warmth) */}
      <div
        className="absolute bottom-[-15%] right-[-10%] h-[700px] w-[700px]
                   animate-float-reverse rounded-full opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(circle, ${COLORS.blob2} 0%, transparent 70%)`,
          filter: "blur(90px)",
        }}
      />

      {/* Top Fade */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/40 to-transparent" />

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/30 to-transparent" />
    </div>
  );
}