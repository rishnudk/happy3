import PageWrapper from "../layout/page-wrapper";
import FadeUp from "../motion/fade-up";

export default function CTA() {
  return (
    <PageWrapper className="relative overflow-hidden">
      {/* BACKGROUND LIGHT */}
      <div
        className="
          absolute
          inset-0
          rounded-[40px]
          bg-gradient-to-br
          from-[rgba(111,66,193,0.18)]
          to-[rgba(245,185,61,0.12)]
          blur-3xl
        "
      />

      <FadeUp>
        <div
          className="
            glass-card
            relative
            overflow-hidden
            rounded-[40px]
            px-8
            py-20
            text-center
            lg:px-20
          "
        >
          {/* DECORATIVE GLOW */}
          <div
            className="
              absolute
              left-1/2
              top-0
              h-60
              w-60
              -translate-x-1/2
              rounded-full
              bg-[var(--primary)]
              opacity-20
              blur-3xl
            "
          />

          <div className="relative z-10 mx-auto max-w-3xl space-y-8">
            {/* BADGE */}
            <div
              className="
                glass-card
                inline-flex
                rounded-full
                px-4
                py-2
                text-sm
              "
            >
              Start Your Transformation
            </div>

            {/* TITLE */}
            <h2
              className="
                text-5xl
                font-bold
                leading-tight
                lg:text-7xl
              "
            >
              Discover the
              <span className="text-[var(--secondary)]">
                {" "}
                Art of Happiness.
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p
              className="
                mx-auto
                max-w-2xl
                text-lg
                text-[var(--muted-foreground)]
              "
            >
              Begin your emotional transformation journey
              today and unlock clarity, confidence,
              purpose, and inner peace.
            </p>

            {/* BUTTONS */}
            <div
              className="
                flex
                flex-wrap
                justify-center
                gap-5
              "
            >
              <button
                className="
                  rounded-full
                  bg-[var(--primary)]
                  px-8
                  py-4
                  text-white
                  glow-purple
                  transition-all
                  duration-500
                  hover:-translate-y-1
                "
              >
                Begin Journey
              </button>

              <button
                className="
                  glass-card
                  rounded-full
                  px-8
                  py-4
                "
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </FadeUp>
    </PageWrapper>
  );
}