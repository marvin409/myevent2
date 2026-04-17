const items = [
  "Premium guest messaging",
  "Dark and light theme control",
  "Live event publishing flow",
  "Luxury-facing event presentation",
  "Developer identity and trust layer",
  "Invitation copy that converts faster",
];

export default function SpotlightMarquee() {
  return (
    <section className="marquee-shell" aria-label="Platform highlights">
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
