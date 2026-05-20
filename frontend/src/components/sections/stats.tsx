import PageWrapper from "../layout/page-wrapper";

const stats = [
  {
    number: "25K+",
    label: "Lives Transformed",
  },
  {
    number: "98%",
    label: "Positive Growth",
  },
  {
    number: "250+",
    label: "Coaching Sessions",
  },
  {
    number: "15+",
    label: "Global Communities",
  },
];

export default function Stats() {
  return (
    <PageWrapper>
      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          lg:grid-cols-4
        "
      >
        {stats.map((item) => (
          <div
            key={item.label}
            className="
              glass-card
              group
              p-8
              transition-all
              duration-500
              hover:-translate-y-2
            "
          >
            <h3
              className="
                text-4xl
                font-bold
                text-[var(--primary)]
              "
            >
              {item.number}
            </h3>

            <p
              className="
                mt-3
                text-[var(--muted-foreground)]
              "
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}