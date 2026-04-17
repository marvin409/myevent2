export default function HeroSection() {
  return (
    <section className="hero-card premium-hero">
      <div className="hero-copy">
        <span className="eyebrow">Ka-Atari Event Planner</span>
        <h1>Make every event page feel expensive, organized, and impossible to ignore.</h1>
        <p>
          Build a premium-facing event presence with stronger messaging, elegant
          presentation, and structured details that push guests toward attendance.
        </p>
        <div className="hero-pills">
          <span>Luxury weddings</span>
          <span>Executive launches</span>
          <span>Private experiences</span>
        </div>
      </div>
      <div className="hero-panel">
        <div className="hero-stat">
          <strong>Premium Positioning</strong>
          <p>Sell exclusivity with better branding, better copy, and better detail.</p>
        </div>
        <div className="hero-stat">
          <strong>Multi-Page Presence</strong>
          <p>Move from homepage to listings, publishing, invitations, and profile pages.</p>
        </div>
      </div>
    </section>
  );
}
