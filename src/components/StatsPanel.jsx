export default function StatsPanel({ stats }) {
  const hooks = stats.conversion_hooks.length
    ? stats.conversion_hooks.join(" · ")
    : "Premium copy · Featured visibility · Public reach";

  return (
    <section className="stats-grid">
      <article className="stat-card">
        <span>Total Events</span>
        <strong>{stats.total_events}</strong>
      </article>
      <article className="stat-card">
        <span>Featured Events</span>
        <strong>{stats.featured_events}</strong>
      </article>
      <article className="stat-card">
        <span>Public Listings</span>
        <strong>{stats.public_events}</strong>
      </article>
      <article className="stat-card wide">
        <span>Growth Features</span>
        <strong>{hooks}</strong>
      </article>
    </section>
  );
}
