import { useEffect, useState } from "react";
import AppShell from "./components/AppShell.jsx";
import DeveloperPage from "./pages/DeveloperPage.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import InvitationsPage from "./pages/InvitationsPage.jsx";
import PublishPage from "./pages/PublishPage.jsx";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  "https://eventplanner.alwaysdata.net/api";

const routes = [
  { id: "home", label: "Home", hash: "#/" },
  { id: "events", label: "Planned Events", hash: "#/events" },
  { id: "publish", label: "Publish Event", hash: "#/publish" },
  { id: "invitations", label: "Invite Guests", hash: "#/invitations" },
  { id: "developer", label: "Developer", hash: "#/developer" },
];

function getRouteFromHash(hash) {
  const match = routes.find((route) => route.hash === hash);
  return match?.id || "home";
}

export default function App() {
  const [route, setRoute] = useState(() => getRouteFromHash(window.location.hash || "#/"));
  const [theme, setTheme] = useState(() => localStorage.getItem("ka-atari-theme") || "light");
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({
    total_events: 0,
    featured_events: 0,
    public_events: 0,
    conversion_hooks: [],
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    function syncRoute() {
      setRoute(getRouteFromHash(window.location.hash || "#/"));
    }

    window.addEventListener("hashchange", syncRoute);
    syncRoute();

    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  useEffect(() => {
    loadDashboard();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("ka-atari-theme", theme);
  }, [theme]);

  async function loadDashboard() {
    setIsLoading(true);
    setLoadError("");

    try {
      const [eventsResponse, statsResponse] = await Promise.all([
        fetch(`${API_BASE}/events`),
        fetch(`${API_BASE}/events/stats`),
      ]);

      if (!eventsResponse.ok || !statsResponse.ok) {
        throw new Error("Unable to load dashboard data.");
      }

      const [eventData, statsData] = await Promise.all([
        eventsResponse.json(),
        statsResponse.json(),
      ]);

      setEvents(Array.isArray(eventData) ? eventData : []);
      setStats({
        total_events: statsData.total_events || 0,
        featured_events: statsData.featured_events || 0,
        public_events: statsData.public_events || 0,
        conversion_hooks: Array.isArray(statsData.conversion_hooks)
          ? statsData.conversion_hooks
          : [],
      });
    } catch (error) {
      // Fallback to demo data when API is unavailable
      console.error("Dashboard load error:", error);
      setEvents([
        {
          id: 1,
          title: "Demo Event",
          description: "This is a demo event. Connect your API to see real events.",
          date: new Date().toISOString(),
          location: "Demo Location",
          is_featured: true,
          is_public: true,
        }
      ]);
      setStats({
        total_events: 1,
        featured_events: 1,
        public_events: 1,
        conversion_hooks: [],
      });
      setLoadError("Demo mode: API unavailable");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateEvent(payload) {
    setStatusMessage("Publishing event...");

    try {
      const response = await fetch(`${API_BASE}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatusMessage(
          `Unable to publish event. Missing: ${data.fields?.join(", ") || "details"}`
        );
        return;
      }

      setStatusMessage("Event published successfully.");
      setEvents((current) => [data, ...current]);
      await loadDashboard();
      window.location.hash = "#/events";
    } catch (error) {
      setStatusMessage("Unable to publish event right now.");
    }
  }

  const pageProps = {
    events,
    stats,
    isLoading,
    loadError,
    statusMessage,
    onCreateEvent: handleCreateEvent,
  };

  return (
    <AppShell
      routes={routes}
      activeRoute={route}
      stats={stats}
      theme={theme}
      onToggleTheme={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
    >
      {route === "home" && <HomePage {...pageProps} />}
      {route === "events" && <EventsPage {...pageProps} />}
      {route === "publish" && <PublishPage {...pageProps} />}
      {route === "invitations" && <InvitationsPage {...pageProps} />}
      {route === "developer" && <DeveloperPage />}
    </AppShell>
  );
}
