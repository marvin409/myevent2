import DeveloperFooter from "./DeveloperFooter.jsx";
import SpotlightMarquee from "./SpotlightMarquee.jsx";

export default function AppShell({
  routes,
  activeRoute,
  stats,
  theme,
  onToggleTheme,
  children,
}) {
  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="page-shell">
        <header className="site-header">
          <div className="nav-cluster">
            <a href="#/" className="brand-mark">
              <span className="brand-kicker">Ka-Atari</span>
              <strong>Event Planner Premium</strong>
            </a>
            <nav className="top-nav" aria-label="Primary navigation">
              {routes.map((route) => (
                <a
                  key={route.id}
                  href={route.hash}
                  className={route.id === activeRoute ? "nav-link active" : "nav-link"}
                >
                  {route.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="header-actions">
            <div className="header-badge">
              <span>Public listings</span>
              <strong>{stats.public_events}</strong>
            </div>
            <button type="button" className="theme-toggle" onClick={onToggleTheme}>
              <span>{theme === "dark" ? "Dark" : "Light"} Mode</span>
              <strong>{theme === "dark" ? "Switch to Light" : "Switch to Dark"}</strong>
            </button>
          </div>
        </header>
        <SpotlightMarquee />
        {children}
        <DeveloperFooter />
      </div>
    </div>
  );
}
