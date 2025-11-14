export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background:
          "radial-gradient(circle at top, rgba(52,211,153,0.15), transparent 60%), #020617",
        color: "#e5e7eb",
      }}
    >
      <div style={{ maxWidth: 720 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "0.25rem 0.75rem",
            borderRadius: "999px",
            border: "1px solid rgba(52,211,153,0.35)",
            backgroundColor: "rgba(15,23,42,0.9)",
            fontSize: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <span style={{ marginRight: "0.4rem" }}>🛰️</span>
          <span>No-code GeoAI for raster analytics</span>
        </div>

        <h1
          style={{
            fontSize: "2.25rem",
            lineHeight: 1.1,
            marginBottom: "0.75rem",
          }}
        >
          Rastera — turn satellite rasters into{" "}
          <span style={{ color: "#6ee7b7" }}>analysis-ready maps</span> in
          minutes.
        </h1>

        <p
          style={{
            fontSize: "0.95rem",
            color: "#9ca3af",
            marginBottom: "1.5rem",
            maxWidth: "40rem",
          }}
        >
          This is the early shell of the Rastera.io platform. Next steps:
          wire this UI to a GeoTIFF/COG backend and multi-LLM orchestration
          so planners and consultants can ask GeoAI questions in plain
          language.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <a
            href="mailto:subanthore.a@gmail.com"
            style={{
              padding: "0.6rem 1rem",
              borderRadius: "999px",
              backgroundColor: "#22c55e",
              color: "#022c22",
              fontSize: "0.9rem",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Book a Rastera demo
          </a>
          <a
            href="#"
            style={{
              padding: "0.6rem 1rem",
              borderRadius: "999px",
              border: "1px solid #374151",
              fontSize: "0.9rem",
              textDecoration: "none",
              color: "#e5e7eb",
            }}
          >
            View product roadmap (coming soon)
          </a>
        </div>

        <p
          style={{
            fontSize: "0.7rem",
            color: "#6b7280",
            marginTop: "1rem",
          }}
        >
          v0.1 • Frontend shell deployed first • Backend GeoAI + raster
          engine coming next.
        </p>
      </div>
    </main>
  );
}
