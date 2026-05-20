import PageWrapper from "../layout/page-wrapper";
import SectionTitle from "../shared/section-title";

const problems = [
  {
    title: "Emotional Burnout",
    description:
      "Constant stress and emotional exhaustion can disconnect you from joy and clarity.",
  },
  {
    title: "Lack of Direction",
    description:
      "Many people feel trapped without purpose, struggling to move forward confidently.",
  },
  {
    title: "Inner Self-Doubt",
    description:
      "Negative self-talk silently limits growth, confidence, and emotional freedom.",
  },
];

export default function Problems() {
  return (
    <PageWrapper className="relative">
      {/* BACKGROUND BLUR */}
      <div
        className="
          blur-ball
          blur-ball-purple
          h-64
          w-64
          right-0
          top-10
        "
      />

      <div
        className="
          grid
          items-center
          gap-20
          lg:grid-cols-2
        "
      >
        {/* LEFT SIDE */}
        <div className="space-y-8">
          <SectionTitle
            badge="The Modern Emotional Crisis"
            title="Many People Are Quietly Struggling Internally."
            description="
              In today's fast-moving world, emotional clarity,
              self-awareness, and happiness are often neglected.
              The result is stress, burnout, and emotional disconnection.
            "
          />

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
            Begin Your Healing Journey
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="grid gap-6">
          {problems.map((item, index) => (
            <div
              key={item.title}
              className={`
                glass-card
                relative
                overflow-hidden
                p-8
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-2xl

                ${index === 1 ? "lg:translate-x-10" : ""}
              `}
            >
              {/* TOP GLOW */}
              <div
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-[2px]
                  bg-gradient-to-r
                  from-transparent
                  via-[var(--secondary)]
                  to-transparent
                "
              />

              <div className="space-y-4">
                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-white/50
                    text-xl
                    backdrop-blur-xl
                  "
                >
                  0{index + 1}
                </div>

                <h3
                  className="
                    text-2xl
                    font-semibold
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    text-[var(--muted-foreground)]
                  "
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}