export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>Auth Layout - Header</div>
      {children}
    </>
  );
}
