export default function PageLayout({
  children, // will be a page or nested layout
  parallel,
}: {
  children: React.ReactNode;
  parallel: React.ReactNode;
}) {
  return (
    <section>
      {children}
      {parallel}
    </section>
  );
}
