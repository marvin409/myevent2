import { useState } from "react";

const initialForm = {
  title: "",
  category: "Wedding",
  description: "",
  host_name: "",
  contact_email: "",
  contact_phone: "",
  venue: "",
  location: "",
  event_date: "",
  start_time: "",
  end_time: "",
  capacity: "",
  ticket_price: "",
  image_url: "",
  theme: "",
  premium_badge: "",
  perks: "",
  tags: "",
  is_featured: true,
  is_public: true,
};

const fieldGroups = [
  {
    title: "Core Identity",
    description: "Capture what the event is, who it is for, and how it should be positioned.",
    fields: ["title", "category", "description", "theme", "premium_badge"],
  },
  {
    title: "Venue And Schedule",
    description: "Add the logistics guests need before they decide to attend.",
    fields: ["venue", "location", "event_date", "start_time", "end_time"],
  },
  {
    title: "Host And Guest Access",
    description: "Make the event easy to trust, contact, and share publicly.",
    fields: ["host_name", "contact_email", "contact_phone", "capacity", "ticket_price"],
  },
  {
    title: "Branding And Extras",
    description: "Use premium details to make the page feel complete and more marketable.",
    fields: ["image_url", "tags", "perks", "is_featured", "is_public"],
  },
];

export default function EventForm({ onSubmit, statusMessage }) {
  const [formData, setFormData] = useState(initialForm);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await onSubmit({
      ...formData,
      capacity: formData.capacity ? Number(formData.capacity) : null,
      ticket_price: formData.ticket_price ? Number(formData.ticket_price) : 0,
    });
    setFormData(initialForm);
  }

  const planningChecklist = [
    formData.title ? "Event title ready" : "Add a memorable title",
    formData.venue && formData.location ? "Venue confirmed" : "Set venue and location",
    formData.event_date && formData.start_time
      ? "Date and time captured"
      : "Choose date and time",
    formData.description ? "Event story added" : "Describe the event experience",
  ];

  return (
    <section className="panel-card">
      <div className="section-heading">
        <span className="eyebrow">Event Planning Suite</span>
        <h2>Plan the event with the details guests care about</h2>
        <p className="section-copy">
          This form collects the main information needed to understand, trust,
          and attend the event. The more complete the plan, the stronger the
          event looks on the front page.
        </p>
      </div>
      <div className="form-intro-grid">
        <article className="planner-brief">
          <span className="planner-label">Planning Status</span>
          <h3>{formData.title || "Untitled Event"}</h3>
          <p>
            {formData.description ||
              "Start by describing the atmosphere, audience, and value of the event."}
          </p>
          <div className="planner-meta">
            <span>{formData.category}</span>
            <span>{formData.event_date || "Date pending"}</span>
            <span>{formData.venue || "Venue pending"}</span>
          </div>
        </article>
        <article className="planner-checklist">
          <span className="planner-label">Required Planning Cues</span>
          {planningChecklist.map((item) => (
            <div key={item} className="check-item">
              <span className="check-dot" />
              <p>{item}</p>
            </div>
          ))}
        </article>
      </div>
      <form className="event-form" onSubmit={handleSubmit}>
        {fieldGroups.map((group) => (
          <fieldset key={group.title} className="form-group-card">
            <legend>{group.title}</legend>
            <p className="group-copy">{group.description}</p>

            {group.fields.includes("title") && (
              <label className="field-block">
                <span>Event title</span>
                <input
                  name="title"
                  placeholder="e.g. Ka-Atari Sunset Gala"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </label>
            )}

            {group.fields.includes("category") && (
              <label className="field-block">
                <span>Event category</span>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option>Wedding</option>
                  <option>Concert</option>
                  <option>Corporate</option>
                  <option>Birthday</option>
                  <option>Conference</option>
                  <option>Festival</option>
                </select>
              </label>
            )}

            {group.fields.includes("description") && (
              <label className="field-block">
                <span>Event description</span>
                <textarea
                  name="description"
                  placeholder="Describe the audience, experience, highlights, and what makes the event worth attending."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </label>
            )}

            {group.fields.includes("theme") && (
              <label className="field-block">
                <span>Theme or dress code</span>
                <input
                  name="theme"
                  placeholder="e.g. Black tie, Afro-fusion, Luxury garden"
                  value={formData.theme}
                  onChange={handleChange}
                />
              </label>
            )}

            {group.fields.includes("premium_badge") && (
              <label className="field-block">
                <span>Premium badge</span>
                <input
                  name="premium_badge"
                  placeholder="e.g. VIP Night, Limited Seats, Signature Experience"
                  value={formData.premium_badge}
                  onChange={handleChange}
                />
              </label>
            )}

            {group.fields.includes("venue") && (
              <div className="inline-fields venue-layout">
                <label className="field-block">
                  <span>Venue</span>
                  <input
                    name="venue"
                    placeholder="Venue name"
                    value={formData.venue}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="field-block">
                  <span>Location</span>
                  <input
                    name="location"
                    placeholder="City / area"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            )}

            {group.fields.includes("event_date") && (
              <div className="inline-fields">
                <label className="field-block">
                  <span>Date</span>
                  <input
                    name="event_date"
                    type="date"
                    value={formData.event_date}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="field-block">
                  <span>Start time</span>
                  <input
                    name="start_time"
                    type="time"
                    value={formData.start_time}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="field-block">
                  <span>End time</span>
                  <input
                    name="end_time"
                    type="time"
                    value={formData.end_time}
                    onChange={handleChange}
                  />
                </label>
              </div>
            )}

            {group.fields.includes("host_name") && (
              <div className="inline-fields venue-layout">
                <label className="field-block">
                  <span>Host name</span>
                  <input
                    name="host_name"
                    placeholder="Organizer or host"
                    value={formData.host_name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label className="field-block">
                  <span>Contact email</span>
                  <input
                    name="contact_email"
                    type="email"
                    placeholder="Email address"
                    value={formData.contact_email}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            )}

            {group.fields.includes("contact_phone") && (
              <div className="inline-fields venue-layout">
                <label className="field-block">
                  <span>Phone number</span>
                  <input
                    name="contact_phone"
                    placeholder="Primary contact number"
                    value={formData.contact_phone}
                    onChange={handleChange}
                  />
                </label>
                <label className="field-block">
                  <span>Guest capacity</span>
                  <input
                    name="capacity"
                    type="number"
                    placeholder="Expected guests"
                    value={formData.capacity}
                    onChange={handleChange}
                  />
                </label>
                <label className="field-block">
                  <span>Ticket price</span>
                  <input
                    name="ticket_price"
                    type="number"
                    step="0.01"
                    placeholder="Ticket price"
                    value={formData.ticket_price}
                    onChange={handleChange}
                  />
                </label>
              </div>
            )}

            {group.fields.includes("image_url") && (
              <label className="field-block">
                <span>Cover image URL</span>
                <input
                  name="image_url"
                  placeholder="Hero image for the event page"
                  value={formData.image_url}
                  onChange={handleChange}
                />
              </label>
            )}

            {group.fields.includes("tags") && (
              <label className="field-block">
                <span>Search tags</span>
                <input
                  name="tags"
                  placeholder="e.g. live music, rooftop, luxury, nairobi"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </label>
            )}

            {group.fields.includes("perks") && (
              <label className="field-block">
                <span>Premium perks</span>
                <textarea
                  name="perks"
                  placeholder="e.g. valet parking, VIP lounge, gourmet dining, backstage access"
                  value={formData.perks}
                  onChange={handleChange}
                />
              </label>
            )}

            {group.fields.includes("is_featured") && (
              <div className="toggle-grid">
                <label className="toggle-row premium-toggle">
                  <input
                    name="is_featured"
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={handleChange}
                  />
                  <span>
                    <strong>Feature on homepage</strong>
                    <small>Push the event into the spotlight section.</small>
                  </span>
                </label>
                <label className="toggle-row premium-toggle">
                  <input
                    name="is_public"
                    type="checkbox"
                    checked={formData.is_public}
                    onChange={handleChange}
                  />
                  <span>
                    <strong>Public visibility</strong>
                    <small>Allow wider reach and front-page discovery.</small>
                  </span>
                </label>
              </div>
            )}
          </fieldset>
        ))}
        <button type="submit" className="primary-button">
          Publish Event
        </button>
        {statusMessage && <p className="status-copy">{statusMessage}</p>}
      </form>
    </section>
  );
}
