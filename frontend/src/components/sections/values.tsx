import PageWrapper from "../layout/page-wrapper";
import SectionTitle from "../shared/section-title";
import FadeUp from "../motion/fade-up";

const values = [
  {
    title: "Personal Growth",
    description:
      "Build long-lasting habits and emotional resilience through mindful transformation.",
    size: "large",
  },
  {
    title: "Inner Peace",
    description:
      "Reconnect with calmness and clarity in everyday life.",
    size: "small",
  },
  {
    title: "Mindset Shift",
    description:
      "Transform negative patterns into empowering beliefs.",
    size: "small",
  },
  {
    title: "Emotional Intelligence",
    description:
      "Understand emotions deeply and respond with confidence.",
    size: "wide",
  },
];

export default function Values() {
  return (
    <PageWrapper className="relative">
      {/* BACKGROUND GLOW */}
      <div
        className="
          blur-ball
          blur-ball-purple
          h-72
          w-72
          left-1/2
          top-0
        "
      />

      {/* TITLE */}
      <FadeUp>
        <div className="mb-16">
          <SectionTitle
            badge="Core Transformation Values"
            title="Designed to Help You Evolve Emotionally."
            description="
              Every coaching experience is designed to support
              deeper awareness, emotional clarity, and authentic growth.
            "
            align="center"
          />
        </div>
      </FadeUp>

      {/* BENTO GRID */}
      <div
        className="
          grid
          gap-6
          lg:grid-cols-3
        "
      >
        {/* LARGE CARD */}
        <FadeUp delay={0.1}>
          <div
            className="
              glass-card
              relative
              overflow-hidden
              p-10
              lg:col-span-2
              lg:row-span-2
              min-h-[500px]
            "
          >
            {/* GLOW */}
            <div
              className="
                absolute
                right-0
                top-0
                h-60
                w-60
                rounded-full
                bg-[var(--primary)]
                opacity-10
                blur-3xl
              "
            />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  bg-white/40
                  text-3xl
                  backdrop-blur-xl
                "
              >
                ✨
              </div>

              <div className="space-y-6">
                <h3
                  className="
                    max-w-md
                    text-4xl
                    font-bold
                  "
                >
                  {values[0].title}
                </h3>

                <p
                  className="
                    max-w-lg
                    text-lg
                    text-[var(--muted-foreground)]
                  "
                >
                  {values[0].description}
                </p>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* SMALL CARD */}
        <FadeUp delay={0.2}>
          <div
            className="
              glass-card
              p-8
              min-h-[240px]
              transition-all
              duration-500
              hover:-translate-y-2
            "
          >
            <div className="space-y-5">
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--secondary)]
                  text-2xl
                "
              >
                🌿
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">
                  {values[1].title}
                </h3>

                <p className="text-[var(--muted-foreground)]">
                  {values[1].description}
                </p>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* SMALL CARD */}
        <FadeUp delay={0.3}>
          <div
            className="
              glass-card
              p-8
              min-h-[240px]
              transition-all
              duration-500
              hover:-translate-y-2
            "
          >
            <div className="space-y-5">
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--primary)]
                  text-2xl
                  text-white
                "
              >
                🧠
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">
                  {values[2].title}
                </h3>

                <p className="text-[var(--muted-foreground)]">
                  {values[2].description}
                </p>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* WIDE CARD */}
        <FadeUp delay={0.4}>
          <div
            className="
              glass-card
              relative
              overflow-hidden
              p-10
              lg:col-span-2
              min-h-[260px]
            "
          >
            {/* LIGHT */}
            <div
              className="
                absolute
                bottom-0
                left-0
                h-40
                w-40
                rounded-full
                bg-[var(--secondary)]
                opacity-20
                blur-3xl
              "
            />

            <div
              className="
                relative
                z-10
                flex
                h-full
                flex-col
                justify-between
                gap-10
                lg:flex-row
                lg:items-end
              "
            >
              <div className="space-y-4">
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-white/40
                    text-2xl
                    backdrop-blur-xl
                  "
                >
                  💜
                </div>

                <h3
                  className="
                    max-w-sm
                    text-3xl
                    font-bold
                  "
                >
                  {values[3].title}
                </h3>
              </div>

              <p
                className="
                  max-w-md
                  text-[var(--muted-foreground)]
                "
              >
                {values[3].description}
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </PageWrapper>
  );
}