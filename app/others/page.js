// The old Jekyll site served "Awards & Services" at /others/. Keep that URL working.
export const metadata = {
  title: 'Awards & Service',
  robots: { index: false },
};

export default function OthersRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/awards/" />
      <link rel="canonical" href="/awards/" />
      <p className="text-text-secondary">This page has moved to <a href="/awards/" className="text-accent underline">Awards &amp; Service</a>.</p>
    </>
  );
}
