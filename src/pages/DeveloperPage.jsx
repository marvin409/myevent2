const strengths = [
  "Product-focused frontend delivery",
  "Brand-sensitive event presentation",
  "API-connected React experiences",
  "Clean interfaces that sell trust quickly",
];

export default function DeveloperPage() {
  return (
    <main className="page-stack">
      <section className="page-hero split-hero">
        <div className="hero-copy">
          <span className="eyebrow">Developer Profile</span>
          <h1>Marvin Ochieng builds event interfaces that feel premium and believable.</h1>
          <p>
            This project is positioned as more than a form. It is a branded event-facing
            product that helps visitors understand what is happening, why it matters, and
            why they should trust it.
          </p>
        </div>
        <article className="page-hero-card accent-card">
          <span className="mini-label">Operating Style</span>
          <strong>Design that sells confidence.</strong>
          <p>
            The focus is on polished structure, stronger messaging, and practical delivery
            that makes an app feel ready for real users.
          </p>
        </article>
      </section>

      <section className="developer-grid">
        <article className="bio-card large">
          <span className="mini-label">About The Developer</span>
          <h2>Turning utility into presentation</h2>
          <p>
            Marvin Ochieng approaches frontend work as product presentation, not only code.
            The goal is to make an interface look credible, intentional, and commercially
            useful from the first screen.
          </p>
          <p>
            For event products, that means balancing elegance with structure: the visitor
            should quickly understand the event, the organizer, the value, and the next
            action to take.
          </p>
        </article>
        <article className="bio-card dark">
          <span className="mini-label">Core Strengths</span>
          <ul className="detail-list">
            {strengths.map((strength) => (
              <li key={strength}>{strength}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="quote-panel">
        <span className="mini-label">Developer Contact</span>
        <h2>Available for branded event platforms, showcase sites, and polished client-facing dashboards.</h2>
        <div className="contact-row">
          <a href="tel:+254105443420">+254105443420</a>
          <a
            href="https://instagram.com/nai.raw.b3rry"
            target="_blank"
            rel="noreferrer"
          >
            @nai.raw.b3rry
          </a>
        </div>
      </section>
    </main>
  );
}
