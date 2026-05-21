export default function Footer() {
  return (
    <footer className="pb-10 pt-24">
      <div className="container-wrapper">
        <div
          className="
            glass-card
            flex
            flex-col
            items-center
            justify-between
            gap-6
            rounded-[40px]
            px-8
            py-10
            text-center
            lg:flex-row
            lg:text-left
          "
        >
          {/* LEFT */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold">
              Happiness Coaching
            </h3>

            <p
              className="
                max-w-md
                text-[var(--muted-foreground)]
              "
            >
              Helping people transform emotionally,
              mentally, and spiritually through
              modern coaching experiences.
            </p>
          </div>

          {/* RIGHT */}
          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-6
              text-sm
            "
          >
            <a href="#">About</a>
            <a href="#">Programs</a>
            <a href="#">Stories</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}