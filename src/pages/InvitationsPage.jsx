const invitationMessages = [
  {
    title: "For elegant private events",
    copy:
      "You are warmly invited to an evening shaped with intention, atmosphere, and memorable detail. Reserve your place and arrive ready for a premium experience.",
  },
  {
    title: "For launches and public experiences",
    copy:
      "Step into an event designed to reward attention. Expect a refined setting, a clear program, and moments worth sharing before the night ends.",
  },
  {
    title: "For weddings and celebration moments",
    copy:
      "Celebrate with us in a setting built for beauty, warmth, and unforgettable energy. Your presence will make the occasion even more meaningful.",
  },
  {
    title: "For VIP and limited-seat access",
    copy:
      "This invitation is intentionally limited. Confirm early to secure access to a curated experience with elevated hospitality and premium guest care.",
  },
];

const persuasionPoints = [
  "Lead with exclusivity when the event has limited capacity.",
  "Describe the atmosphere so guests can imagine themselves there.",
  "Mention timing, venue quality, and convenience clearly.",
  "Use premium language without sounding vague or exaggerated.",
];

export default function InvitationsPage() {
  return (
    <main className="page-stack">
      <section className="page-hero split-hero">
        <div className="hero-copy">
          <span className="eyebrow">Invitation Messaging</span>
          <h1>Use guest-facing copy that makes attendance feel like the obvious decision.</h1>
          <p>
            These messages are written to raise curiosity, improve trust, and make your
            event sound well-organized, selective, and worth showing up for.
          </p>
        </div>
        <article className="page-hero-card dark">
          <span className="mini-label">Conversion Angle</span>
          <strong>Invitation copy should remove hesitation.</strong>
          <p>
            Guests respond faster when the message explains the atmosphere, the value, and
            the feeling of being included.
          </p>
        </article>
      </section>

      <section className="message-grid">
        {invitationMessages.map((message) => (
          <article key={message.title} className="message-card">
            <span className="mini-label">Guest Message</span>
            <h2>{message.title}</h2>
            <p>{message.copy}</p>
          </article>
        ))}
      </section>

      <section className="quote-panel">
        <span className="mini-label">Message Rules</span>
        <h2>Words should make the event feel planned, welcoming, and slightly scarce.</h2>
        <ul className="detail-list">
          {persuasionPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
