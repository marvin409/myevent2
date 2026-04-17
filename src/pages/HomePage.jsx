import EventShowcase from "../components/EventShowcase.jsx";
import FeatureStrip from "../components/FeatureStrip.jsx";
import HeroSection from "../components/HeroSection.jsx";
import StatsPanel from "../components/StatsPanel.jsx";

export default function HomePage({ events, stats, isLoading, loadError }) {
  const featuredEvents = events.filter((event) => event.is_featured).slice(0, 3);

  return (
    <main className="page-stack">
      <HeroSection />
      <FeatureStrip />
      <StatsPanel stats={stats} />

      {loadError && <section className="info-banner error">{loadError}</section>}
      {isLoading && <section className="info-banner">Loading premium event intelligence...</section>}

      <section className="two-column-overview">
        <article className="editorial-card large">
          <span className="mini-label">Premium Positioning</span>
          <h2>The interface now behaves like a small event platform, not a landing page.</h2>
          <p>
            Visitors can browse live events, read invitation-ready messages, review the
            developer profile, and move into publishing without losing context.
          </p>
          <div className="cta-row">
            <a href="#/events" className="primary-button inline-link">
              Explore listings
            </a>
            <a href="#/publish" className="secondary-button inline-link">
              Publish an event
            </a>
          </div>
        </article>
        <article className="editorial-card dark">
          <span className="mini-label">Featured Focus</span>
          <div className="spotlight-stack">
            {featuredEvents.length === 0 ? (
              <p>No featured events yet. Publish one to activate the spotlight rail.</p>
            ) : (
              featuredEvents.map((event) => (
                <div key={event.id} className="spotlight-item">
                  <strong>{event.title}</strong>
                  <span>
                    {event.venue} · {event.location}
                  </span>
                </div>
              ))
            )}
          </div>
        </article>
      </section>

      <EventShowcase events={events.slice(0, 4)} />
    </main>
  );
}
