type SectionTitleProps = {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionTitle({
  badge,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  return (
    <div
      className={`
        space-y-5
        ${align === "center" ? "text-center mx-auto" : ""}
      `}
    >
      {badge && (
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
          {badge}
        </div>
      )}

      <h2
        className="
          text-4xl
          font-bold
          leading-tight
          lg:text-6xl
        "
      >
        {title}
      </h2>

      {description && (
        <p
          className="
            max-w-2xl
            text-lg
            text-[var(--muted-foreground)]
          "
        >
          {description}
        </p>
      )}
    </div>
  );
}