import EventShowcase from "../components/EventShowcase.jsx";

export default function EventsPage({ events, stats, isLoading, loadError }) {
  return (
    <main className="page-stack">
      <section className="page-hero compact">
        <div className="hero-copy">
          <span className="eyebrow">Planned Events</span>
          <h1>Browse the live event portfolio guests and partners can trust.</h1>
          <p>
            This page presents upcoming experiences with venue details, premium
            positioning, pricing cues, and availability signals.
          </p>
        </div>
        <div className="page-hero-card accent-card">
          <span className="mini-label">Portfolio Snapshot</span>
          <strong>{stats.total_events} active concepts</strong>
          <p>
            {stats.featured_events} featured experiences and {stats.public_events} public
            listings are currently visible.
          </p>
        </div>
      </section>

      {loadError && <section className="info-banner error">{loadError}</section>}
      {isLoading && <section className="info-banner">Loading the latest event listings...</section>}

      <section className="two-column-overview">
        <article className="editorial-card">
          <span className="mini-label">What Visitors See</span>
          <h2>Each listing is structured to answer the questions that block attendance.</h2>
          <p>
            Venue certainty, timing, category, atmosphere, and ticket value are all visible
            before a guest decides to commit.
          </p>
        </article>
        <article className="editorial-card dark">
          <span className="mini-label">Why It Feels Real</span>
          <ul className="detail-list">
            <li>Premium badges make top-tier experiences visible at a glance.</li>
            <li>Capacity and price cues create urgency and context.</li>
            <li>Category and theme tags help visitors self-select quickly.</li>
          </ul>
        </article>
      </section>

      <EventShowcase events={events} />
    </main>
  );
}
