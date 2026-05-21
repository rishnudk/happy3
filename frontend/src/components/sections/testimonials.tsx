import PageWrapper from "../layout/page-wrapper";
import SectionTitle from "../shared/section-title";
import FadeUp from "../motion/fade-up";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Entrepreneur",
    quote:
      "This coaching completely transformed the way I think, feel, and approach my life. I finally feel emotionally aligned.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    name: "David Chen",
    role: "Creative Director",
    quote:
      "The emotional clarity and mindset shifts I gained helped me reconnect with my purpose and confidence.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    name: "Emma Wilson",
    role: "Wellness Coach",
    quote:
      "I now feel calmer, stronger, and emotionally aware in ways I never imagined before.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  },
];

export default function Testimonials() {
  return (
    <PageWrapper className="relative overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div
        className="
          blur-ball
          blur-ball-yellow
          h-80
          w-80
          right-0
          top-20
        "
      />

      {/* SECTION TITLE */}
      <FadeUp>
        <div className="mb-16">
          <SectionTitle
            badge="Transformation Stories"
            title="Real People. Real Emotional Growth."
            description="
              Thousands of people have transformed their mindset,
              emotional awareness, and confidence through our coaching.
            "
            align="center"
          />
        </div>
      </FadeUp>

      {/* TESTIMONIAL GRID */}
      <div
        className="
          grid
          gap-8
          lg:grid-cols-3
        "
      >
        {testimonials.map((item, index) => (
          <FadeUp
            key={item.name}
            delay={index * 0.15}
          >
            <div
              className="
                glass-card
                relative
                overflow-hidden
                p-8
                transition-all
                duration-500
                hover:-translate-y-2
                hover:shadow-2xl
              "
            >
              {/* TOP LIGHT */}
              <div
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-[2px]
                  bg-gradient-to-r
                  from-transparent
                  via-[var(--primary)]
                  to-transparent
                "
              />

              <div className="space-y-8">
                {/* PROFILE */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      h-16
                      w-16
                      rounded-full
                      object-cover
                    "
                  />

                  <div>
                    <h3
                      className="
                        text-lg
                        font-semibold
                      "
                    >
                      {item.name}
                    </h3>

                    <p
                      className="
                        text-sm
                        text-[var(--muted-foreground)]
                      "
                    >
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* QUOTE */}
                <p
                  className="
                    text-lg
                    leading-relaxed
                    text-[var(--foreground)]
                  "
                >
                  “{item.quote}”
                </p>

                {/* STARS */}
                <div className="flex gap-1 text-xl">
                  ⭐ ⭐ ⭐ ⭐ ⭐
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </PageWrapper>
  );
}