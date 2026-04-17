const features = [
  {
    title: "Curated Themes",
    copy: "Build events around atmosphere, dress code, and visual identity.",
  },
  {
    title: "Guest Conversion",
    copy: "Use premium copy, scarcity cues, and polished information hierarchy.",
  },
  {
    title: "Live Publishing",
    copy: "Push new listings into the portfolio with structured event data.",
  },
  {
    title: "Brand Presence",
    copy: "Showcase the developer, the organizer, and the event story clearly.",
  },
];

export default function FeatureStrip() {
  return (
    <section className="feature-strip">
      {features.map((feature) => (
        <article key={feature.title} className="feature-chip">
          <strong>{feature.title}</strong>
          <p>{feature.copy}</p>
        </article>
      ))}
    </section>
  );
}
