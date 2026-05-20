export default function Navbar() {
  return (
    <header className="w-full pt-6">
      <div className="container-wrapper">
        <nav
          className="
            glass-card
            flex
            items-center
            justify-between
            px-6
            py-4
          "
        >
          {/* LEFT */}
          <div>
            <h2 className="text-xl font-semibold">
              Happiness Coaching
            </h2>
          </div>

          {/* CENTER */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#">Features</a>
            <a href="#">Programs</a>
            <a href="#">Stories</a>
            <a href="#">Community</a>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            <button
              className="
                rounded-full
                px-5
                py-3
                text-sm
                glass-card
              "
            >
              Explore
            </button>

            <button
              className="
                rounded-full
                bg-[var(--secondary)]
                px-6
                py-3
                text-sm
                font-medium
                soft-shadow
              "
            >
              Start Journey
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}