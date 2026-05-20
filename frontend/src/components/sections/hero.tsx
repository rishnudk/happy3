import PageWrapper from "../layout/page-wrapper";
import Floating from "../motion/floating";

export default function Hero() {
  return (
    <PageWrapper className="pt-20">
      <div
        className="
          grid
          items-center
          gap-16
          lg:grid-cols-2
        "
      >
        {/* LEFT SIDE */}
        <div className="space-y-8">
            <Floating duration={5}>
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
            Your Journey Starts Here
          </div>
          </Floating>

          <div className="space-y-6">
            <h1
              className="
                max-w-xl
                text-5xl
                font-bold
                leading-tight
                lg:text-7xl
              "
            >
              Transforming Mindsets,
              <span className="text-[var(--secondary)]">
                {" "}
                Elevating Lives.
              </span>
            </h1>

            <p
              className="
                max-w-lg
                text-lg
                text-[var(--muted-foreground)]
              "
            >
              Happiness is a skill you can learn.
              Build emotional resilience, clarity,
              and transformation through guided
              coaching.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              className="
                rounded-full
                bg-[var(--primary)]
                px-8
                py-4
                text-white
                glow-purple
              "
            >
              Start Transformation
            </button>

            <button
              className="
                glass-card
                rounded-full
                px-8
                py-4
              "
            >
              Discover Method
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center">
          {/* CIRCLE BACKGROUND */}
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

          {/* IMAGE */}
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
              alt="Hero"
              className="
                h-[600px]
                w-[450px]
                object-cover
              "
            />
          </div>
          <Floating duration={6}>
          
<div
  className="
    blur-ball
    blur-ball-purple
    h-40
    w-40
    top-10
    right-10
  "
/>

<div
  className="
    blur-ball
    blur-ball-yellow
    h-32
    w-32
    bottom-10
    left-10
  "
/>

          {/* FLOATING CARD */}
          <div
            className="
              glass-card
              absolute
              left-0
              top-20
              z-20
              rounded-full
              px-5
              py-3
              text-sm
            "
          >
            Emotional clarity
          </div>
          </Floating>

          {/* FLOATING CARD */}
          <div
            className="
              glass-card
              absolute
              bottom-24
              right-0
              z-20
              rounded-full
              px-5
              py-3
              text-sm
            "
          >
            Mindset Shift
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}