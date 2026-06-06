export function GlobalBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base vertical gradient with transition tones */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #e0c3f0ff 0%, #FAF8FD 18%, #FCFAFF 50%, #FAF8FD 82%, #F6F3FA 100%)",
        }}
      />

      {/* Aurora layer */}
      <div className="absolute inset-0 animate-aurora-slow opacity-70 mix-blend-multiply">
        <div
          className="absolute -top-40 -left-32 h-[60vw] w-[60vw] rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(closest-side, #e7dee7ff 0%, #F5D0FE 40%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
        <div
          className="absolute top-[35%] -right-40 h-[55vw] w-[55vw] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, #DCC7E8 0%, #FCFAFF 50%, transparent 75%)",
            filter: "blur(10px)",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[20%] h-[50vw] w-[50vw] rounded-full opacity-35"
          style={{
            background:
              "radial-gradient(closest-side, #dac0daff 0%, #DCC7E8 45%, transparent 75%)",
            filter: "blur(10px)",
          }}
        />
      </div>

      {/* Mesh glow accent — top right warm */}
      <div className="absolute inset-0 animate-aurora opacity-60">
        <div
          className="absolute top-[10%] right-[15%] h-[28vw] w-[28vw] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(226, 191, 230, 0.3), transparent 70%)",
            filter: "blur(10px)",
          }}
        />
        <div
          className="absolute top-[55%] left-[8%] h-[32vw] w-[32vw] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(220,199,232,0.55), transparent 70%)",
            filter: "blur(10px)",
          }}
        />
      </div>

      {/* Top & bottom soft fades for cinematic vignette */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white/30 to-transparent" />

      {/* Noise grain */}
      <div className="noise-overlay absolute inset-0 opacity-[0.05] mix-blend-overlay" />
    </div>
  );
}
