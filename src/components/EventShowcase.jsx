const fallbackImage =
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80";

export default function EventShowcase({ events }) {
  return (
    <section className="panel-card">
      <div className="section-heading">
        <span className="eyebrow">Live Listings</span>
        <h2>Events ready for the spotlight</h2>
      </div>
      <div className="event-stack">
        {events.length === 0 ? (
          <article className="empty-state">
            No events published yet. Use the form to create the first listing.
          </article>
        ) : (
          events.map((event) => (
            <article key={event.id} className="event-card">
              <img src={event.image_url || fallbackImage} alt={event.title} />
              <div className="event-card-body">
                <div className="event-topline">
                  <span>{event.category}</span>
                  {event.premium_badge && <strong>{event.premium_badge}</strong>}
                </div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="meta-grid">
                  <span>{event.venue}</span>
                  <span>{event.location}</span>
                  <span>{event.event_date}</span>
                  <span>
                    {event.start_time}
                    {event.end_time ? ` - ${event.end_time}` : ""}
                  </span>
                </div>
                <div className="tag-row">
                  {event.theme && <span>{event.theme}</span>}
                  {event.ticket_price > 0 && <span>KES {event.ticket_price}</span>}
                  {event.capacity && <span>{event.capacity} guests</span>}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

