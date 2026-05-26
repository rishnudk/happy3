type PageWrapperProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export default function PageWrapper({
  children,
  className = "",
  id,
}: PageWrapperProps) {
  return (
    <section
      id={id}
      className={`
        container-wrapper
        relative
        py-16
        ${className}
      `}
    >
      {children}
    </section>
  );
}