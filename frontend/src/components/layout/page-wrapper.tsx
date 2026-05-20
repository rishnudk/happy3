type PageWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export default function PageWrapper({
  children,
  className = "",
}: PageWrapperProps) {
  return (
    <section
      className={`
        container-wrapper
        relative
        py-24
        ${className}
      `}
    >
      {children}
    </section>
  );
}