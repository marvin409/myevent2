import EventForm from "../components/EventForm.jsx";

export default function PublishPage({
  onCreateEvent,
  statusMessage,
  stats,
  isLoading,
  loadError,
}) {
  return (
    <main className="page-stack">
      <section className="page-hero split-hero">
        <div className="hero-copy">
          <span className="eyebrow">Publish Center</span>
          <h1>Create a listing that looks investor-ready before the first RSVP.</h1>
          <p>
            Use the structured form below to capture the narrative, logistics, brand cues,
            and guest confidence signals that make an event easier to promote.
          </p>
        </div>
        <div className="hero-column">
          <article className="page-hero-card">
            <span className="mini-label">Publishing Guidance</span>
            <strong>Lead with clarity, not noise.</strong>
            <p>
              Strong titles, clear venue data, a polished image, and a visible badge improve
              perceived quality immediately.
            </p>
          </article>
          <article className="page-hero-card dark">
            <span className="mini-label">Current Reach</span>
            <strong>{stats.public_events} events ready for discovery</strong>
            <p>
              {stats.featured_events} of them are already positioned as premium featured
              experiences.
            </p>
          </article>
        </div>
      </section>

      {loadError && !isLoading && (
        <section className="info-banner error">
          Stats could not be refreshed, but you can still publish an event.
        </section>
      )}

      <EventForm onSubmit={onCreateEvent} statusMessage={statusMessage} />
    </main>
  );
}
