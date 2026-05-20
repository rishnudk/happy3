import PageWrapper from "../layout/page-wrapper";
import SectionTitle from "../shared/section-title";
import Floating from "../motion/floating";
import FadeUp from "../motion/fade-up";

const solutions = [
  {
    title: "Mindset Coaching",
    description:
      "Reframe limiting beliefs and unlock healthier emotional patterns.",
  },
  {
    title: "Emotional Awareness",
    description:
      "Develop clarity and deeper understanding of your emotions and reactions.",
  },
  {
    title: "Purpose Alignment",
    description:
      "Reconnect with your goals, vision, and authentic self.",
  },
];

export default function Solutions() {
  return (
    <PageWrapper className="relative overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div
        className="
          blur-ball
          blur-ball-yellow
          h-72
          w-72
          left-0
          top-20
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
        {/* LEFT VISUAL */}
        <div className="relative flex justify-center">
          {/* BIG CIRCLE */}
          <div
            className="
              absolute
              h-[500px]
              w-[500px]
              rounded-full
              border
              border-white/40
              bg-white/20
              backdrop-blur-3xl
            "
          />

          {/* IMAGE CARD */}
          <FadeUp>
          <div
            className="
              glass-card
              relative
              z-10
              overflow-hidden
              rounded-[40px]
              p-4
            "
          >
            <img
              src="/images/hero.png"
              alt="Solution"
              className="
                h-[600px]
                w-[450px]
                object-cover
              "
            />
          </div>
          </FadeUp>

          {/* FLOATING CARD 1 */}
          <Floating duration={6}>
            <div
              className="
                glass-card
                absolute
                left-0
                top-20
                z-20
                rounded-3xl
                p-5
              "
            >
              <p className="text-sm font-medium">
                Emotional Balance
              </p>

              <h4 className="mt-2 text-2xl font-bold">
                92%
              </h4>
            </div>
          </Floating>

          {/* FLOATING CARD 2 */}
          <Floating duration={8}>
            <div
              className="
                glass-card
                absolute
                bottom-20
                right-0
                z-20
                rounded-3xl
                p-5
              "
            >
              <p className="text-sm font-medium">
                Happiness Growth
              </p>

              <h4 className="mt-2 text-2xl font-bold">
                +85%
              </h4>
            </div>
          </Floating>
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-10">
            <FadeUp>
          <SectionTitle
            badge="Our Coaching Process"
            title="A Practical Path Toward Emotional Transformation."
            description="
              Our coaching framework combines emotional awareness,
              mindset training, and personal growth practices
              designed to create long-lasting change.
            "
          />
          </FadeUp>

          <div className="space-y-6">
            {solutions.map((item, index) => (
              <div
                key={item.title}
                className="
                  glass-card
                  flex
                  gap-5
                  p-6
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:shadow-2xl
                "
              >
                {/* NUMBER */}
                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[var(--primary)]
                    text-lg
                    font-bold
                    text-white
                  "
                >
                  0{index + 1}
                </div>

                {/* CONTENT */}
                <div className="space-y-2">
                  <h3
                    className="
                      text-xl
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
      </div>
    </PageWrapper>
  );
}